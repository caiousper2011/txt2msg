import {
  Badge,
  Box,
  Button,
  calc,
  Flex,
  HStack,
  Icon,
  Input,
  SimpleGrid,
  Text,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import { useRouter } from 'next/dist/client/router';
import { useEffect } from 'react';
import { RiMenuLine, RiSearchLine } from 'react-icons/ri';
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

  useEffect(() => {
    if (!conversation.data) {
      router.push('/');
    }

    onOpen();
  }, [conversation, mainContact, router, onOpen]);

  return (
    <>
      <Flex
        w={calc.subtract('100vw', `${theme.space}`)}
        h={calc.subtract('100vh', '110px')}
        mt={6}
        mx={6}
        bg="gray.800"
        borderRadius={4}
        flexDirection="column"
      >
        <HStack
          alignItems="center"
          bg="gray.600"
          p={4}
          borderTopRadius={4}
          boxShadow="md"
        >
          <HStack>
            <Button variant="unstyled">
              <Icon as={RiMenuLine} fontSize={24} />
            </Button>
            <Text fontSize={20} fontWeight="light">
              Conversas renderizadas
            </Text>
          </HStack>
          <Badge>11 95287-5150</Badge>
        </HStack>
        <Flex
          flex="1"
          flexDirection="column"
          alignItems="flex-start"
          px={4}
          py={2}
          overflowY="auto"
        >
          {Boolean(data) &&
            Boolean(mainContact) &&
            data.map((message, index) =>
              mainContact === message.writterName ? (
                <Box
                  maxW="80%"
                  minW="60%"
                  bg="pink.500"
                  p={4}
                  my={2}
                  borderRadius={4}
                  alignSelf="flex-end"
                >
                  <Text fontSize={18} fontWeight="medium" color="gray.900">
                    {message.data}
                  </Text>
                  <HStack
                    justify="space-between"
                    alignItems="flex-end"
                    color="gray.1
                    00"
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
                  key={index}
                  maxW="80%"
                  minW="60%"
                  bg="gray.900"
                  p={4}
                  my={2}
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
              ),
            )}
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
