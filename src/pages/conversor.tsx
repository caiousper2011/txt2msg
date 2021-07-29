import {
  Badge,
  Box,
  Button,
  calc,
  Flex,
  HStack,
  Icon,
  Input,
  List,
  ListIcon,
  ListItem,
  SimpleGrid,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { useRouter } from 'next/dist/client/router';
import { ChangeEvent, FormEvent, useEffect } from 'react';
import {
  RiCloseLine,
  RiMenuLine,
  RiSearchLine,
  RiUserLine,
} from 'react-icons/ri';
import { useConversation } from '../contexts/ConversationContext';
import { theme } from '../styles/theme';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
} from '@chakra-ui/react';
import { useState } from 'react';
import { Radio, RadioGroup } from '@chakra-ui/react';

const Conversor: React.FC = () => {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [mainContact, setMainContact] = useState('');
  const { conversation } = useConversation();
  const { data, writtersName } = conversation;
  const [search, setSearch] = useState('');
  const [toShowConversation, setToShowConversation] = useState(data);
  const { isOpen: showMenu, onToggle } = useDisclosure();
  const [highLightContact, setHighLightContact] = useState('');

  useEffect(() => {
    if (!conversation.data) {
      router.push('/');
    }

    onOpen();
  }, [conversation, mainContact, router, onOpen]);

  const handleFilterMessagesBySearch = (
    inputEvent: ChangeEvent<HTMLInputElement>,
  ) => {
    inputEvent.preventDefault();
    const searchedValue = inputEvent.target.value;
    setSearch(searchedValue);
    setToShowConversation([
      ...data.filter((data) =>
        data.data.toLowerCase().includes(searchedValue.toLowerCase()),
      ),
    ]);
  };

  return (
    <>
      <Flex
        w={calc.subtract('100vw', `${theme.space}`)}
        h={calc.subtract('100vh', '110px')}
        bg="gray.800"
        mx={6}
        mt={6}
        borderRadius={4}
        flexDirection="column"
      >
        <HStack
          alignItems="center"
          bg="gray.600"
          p={4}
          borderTopRadius={4}
          boxShadow="md"
          position="relative"
        >
          <Button variant="unstyled" onClick={onToggle}>
            <Icon as={showMenu ? RiCloseLine : RiMenuLine} fontSize={24} />
          </Button>
          <Text
            as="button"
            fontSize={16}
            fontWeight="medium"
            onClick={onOpen}
            title="Trocar contato principal"
          >
            {mainContact}
          </Text>
        </HStack>

        <Flex position="relative" flex="1" direction="row" overflow="hidden">
          {showMenu && (
            <Flex
              w="320px"
              bg="gray.600"
              flexDirection="column"
              h="100%"
              boxShadow="2xl"
            >
              <Tabs colorScheme="pink">
                <TabList>
                  <Tab
                    fontSize={18}
                    color="whiteAlpha.700"
                    _selected={{
                      color: 'white',
                    }}
                  >
                    Contatos
                  </Tab>
                  <Tab
                    fontSize={18}
                    color="whiteAlpha.700"
                    _selected={{
                      color: 'white',
                    }}
                  >
                    Datas
                  </Tab>
                </TabList>
                <TabPanels>
                  <TabPanel>
                    <Text fontSize="md" color="gray.300">
                      Contatos participantes da conversas
                    </Text>
                    <List spacing={3} mt={4}>
                      {writtersName.map((writterName, index) => (
                        <ListItem
                          as="button"
                          key={index}
                          color={
                            mainContact === writterName
                              ? 'gray.100'
                              : 'gray.300'
                          }
                          onClick={() =>
                            setHighLightContact((oldWritter) => {
                              return oldWritter === writterName
                                ? ''
                                : writterName;
                            })
                          }
                        >
                          <ListIcon as={RiUserLine} />
                          {writterName}
                        </ListItem>
                      ))}
                    </List>
                  </TabPanel>
                  <TabPanel>2</TabPanel>
                </TabPanels>
              </Tabs>
            </Flex>
          )}
          <Flex
            flex="1"
            flexDirection="column"
            alignItems="flex-start"
            px={4}
            py={2}
            overflowY="scroll"
          >
            {Boolean(toShowConversation) &&
              Boolean(mainContact) &&
              toShowConversation.map((message, index) => (
                <Flex
                  key={index}
                  w="100%"
                  flexDirection="column"
                  bg={
                    highLightContact === message.writterName ? 'gray.700' : ''
                  }
                  py={2}
                >
                  {mainContact === message.writterName ? (
                    <Box
                      maxW="80%"
                      minW="70%"
                      bg="pink.500"
                      p={4}
                      borderRadius={4}
                      alignSelf="flex-end"
                    >
                      <Text fontSize={18} fontWeight="medium" color="gray.900">
                        {message.data}
                      </Text>
                      <HStack
                        justify="space-between"
                        alignItems="flex-end"
                        color="gray.100"
                      >
                        <Text fontSize="xs" mt={4}>
                          {message.messageDate}
                        </Text>
                        <Text fontSize="xs" mt={4}>
                          {message.writterName}
                        </Text>
                      </HStack>
                    </Box>
                  ) : (
                    <Box
                      maxW="80%"
                      minW="45%"
                      w="auto"
                      bg="gray.900"
                      p={4}
                      borderRadius={4}
                    >
                      <Text fontSize={18} color="gray.300">
                        {message.data}
                      </Text>
                      <HStack justify="space-between" alignItems="flex-end">
                        <Text fontSize="xs" mt={4}>
                          {message.messageDate}
                        </Text>
                        <Text fontSize="xs" mt={4}>
                          {message.writterName}
                        </Text>
                      </HStack>
                    </Box>
                  )}
                </Flex>
              ))}
          </Flex>
        </Flex>
        <Box bg="gray.800" px={4} py={4}>
          <Flex
            as="label"
            py="3"
            pl={2}
            pr={4}
            alignItems="center"
            color="gray.200"
            position="relative"
            bg="gray.900"
            borderRadius="full"
          >
            <Input
              color="gray.50"
              variant="unstyled"
              placeholder="Buscar mensagem"
              _placeholder={{ color: 'gray.400' }}
              px="4"
              mr="4"
              onChange={handleFilterMessagesBySearch}
              value={search}
            />
            <Icon as={RiSearchLine} fontSize="20" />
          </Flex>
        </Box>
      </Flex>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        closeOnEsc={false}
        closeOnOverlayClick={false}
      >
        <ModalOverlay />
        <ModalContent bg="gray.900" m="auto">
          <ModalHeader fontSize="2xl">
            Selecionar o contato principal na conversa
          </ModalHeader>
          <ModalBody>
            <Text color="gray.300">
              Selecione o contato principal, pode ser você ou outro contato da
              lista abaixo:
            </Text>

            <HStack>
              <RadioGroup
                onChange={setMainContact}
                value={mainContact}
                colorScheme="pink"
              >
                <SimpleGrid
                  flexDirection="column"
                  alignItems="flex-start"
                  spacing={2}
                  mt={4}
                >
                  {writtersName?.map((writterName) => (
                    <Radio key={writterName} value={writterName}>
                      {writterName}
                    </Radio>
                  ))}
                </SimpleGrid>
              </RadioGroup>
            </HStack>
          </ModalBody>

          <ModalFooter>
            <Button
              variant="outline"
              colorScheme="pink"
              disabled={!mainContact}
              onClick={onClose}
            >
              Fechar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Conversor;
