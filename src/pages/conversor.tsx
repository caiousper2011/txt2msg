import {
  Badge,
  Button,
  calc,
  Flex,
  HStack,
  Icon,
  Input,
  SimpleGrid,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useDisclosure,
  Radio,
  RadioGroup,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Box,
} from '@chakra-ui/react';
import { useRouter } from 'next/dist/client/router';
import { MutableRefObject, useRef } from 'react';
import {
  ChangeEvent,
  useEffect,
  useState,
  createRef,
  useCallback,
} from 'react';
import {
  RiArrowDownLine,
  RiArrowUpLine,
  RiCloseLine,
  RiMenuLine,
  RiSearchLine,
} from 'react-icons/ri';
import { useConversation } from '../contexts/ConversationContext';
import { theme } from '../styles/theme';
import { APPLICATION_WRITTER_NAME } from '../utils/index';
import { FilterHeader } from '../components/FilterHeader';
import { FilterTabHeader } from '../components/FilterTabHeader';
import FilterByContacts from '../components/FilterByContacts';
import { FilterByDates } from '../components/FilterByDates';
import { Message } from '../components/Message';
import { MessageApp } from '../components/MessageApp';
import { SearchMessages } from '../components/SearchMessages';

const Conversor: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [mainContact, setMainContact] = useState('');
  const { conversation } = useConversation();
  const { data, writtersName, messagesDate } = conversation;
  const [toShowConversation, setToShowConversation] = useState(data);
  const { isOpen: showMenu, onToggle } = useDisclosure();
  const [highLightContact, setHighLightContact] = useState('');
  const [messageBoxRef, setMessageBoxRef] = useState(
    [] as MutableRefObject<HTMLDivElement>[],
  );
  const messagesContainerRef = useRef<HTMLDivElement>();

  useEffect(() => {
    setMessageBoxRef(
      Array(toShowConversation.length)
        .fill(undefined)
        .map(() => createRef()),
    );

    onOpen();
  }, [onOpen, toShowConversation]);

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
                <FilterTabHeader tabs={['Contatos', 'Datas']} />
                <TabPanels>
                  <TabPanel overflow="hidden">
                    <FilterHeader
                      title="Contatos participantes da conversas."
                      subtitle="Para destacar as mensagens desse contato basta clicar que
                      as mensagens enviadas por ele serão destacadas em tela"
                    />
                    <FilterByContacts
                      mainContact={mainContact}
                      highLightContact={highLightContact}
                      handleHighLightContact={setHighLightContact}
                      writtersName={writtersName}
                    />
                  </TabPanel>
                  <TabPanel>
                    <FilterHeader
                      title="Datas onde as conversas ocorreram."
                      subtitle="Para destacar as mensagens de alguma data, basta clicar
                      que as mensagens na respectiva data selecionada serão
                      destacadas em tela"
                    />
                    <FilterByDates messagesDate={messagesDate} />
                  </TabPanel>
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
            ref={messagesContainerRef}
          >
            {Boolean(toShowConversation) &&
              Boolean(mainContact) &&
              toShowConversation.map((message, index) => (
                <>
                  {message.writterName === APPLICATION_WRITTER_NAME ? (
                    <MessageApp key={index} message={message} />
                  ) : (
                    <Flex
                      key={index}
                      w="100%"
                      flexDirection="column"
                      bg={
                        highLightContact === message.writterName
                          ? 'gray.700'
                          : ''
                      }
                      py={2}
                    >
                      <Message
                        message={message}
                        ref={messageBoxRef[index]}
                        mainWritter={mainContact}
                      />
                    </Flex>
                  )}
                </>
              ))}
          </Flex>
        </Flex>

        <SearchMessages
          messagesBoxRef={messageBoxRef}
          messages={toShowConversation}
          messagesContainerRef={messagesContainerRef}
        />
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
