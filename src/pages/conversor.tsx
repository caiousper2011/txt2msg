import {
  Badge,
  Box,
  Button,
  calc,
  Checkbox,
  CheckboxGroup,
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
  Radio,
  RadioGroup,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
} from '@chakra-ui/react';
import { useRouter } from 'next/dist/client/router';
import { ElementRef, LegacyRef, useRef } from 'react';
import {
  ChangeEvent,
  useEffect,
  useState,
  MutableRefObject,
  createRef,
  useCallback,
} from 'react';

import {
  RiArrowDownLine,
  RiArrowUpLine,
  RiCalendarLine,
  RiCloseLine,
  RiMenuLine,
  RiSearchLine,
  RiStarSFill,
  RiUserLine,
} from 'react-icons/ri';
import { useConversation } from '../contexts/ConversationContext';
import { theme } from '../styles/theme';
import { APPLICATION_WRITTER_NAME } from '../utils/index';

interface SearchControls {
  searchedValuesIndex?: number[];
  searchedValuesPosition?: number[];
  searchedValue?: string;
  currentPosition?: number;
  nextPosition?: number;
  previousPosition?: number;
}

const Conversor: React.FC = () => {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [mainContact, setMainContact] = useState('');
  const { conversation } = useConversation();
  const { data, writtersName, messagesDate } = conversation;
  const [search, setSearch] = useState('');
  const [toShowConversation, setToShowConversation] = useState(data);
  const { isOpen: showMenu, onToggle } = useDisclosure();
  const [highLightContact, setHighLightContact] = useState('');
  const [datesFilter, setDatesFilter] = useState({});
  const [findByRefs, setFindByRefs] = useState([]);
  const [messageBoxRef, setMessageBoxRef] = useState([] as any[]);
  const messagesContainerRef = useRef<HTMLDivElement>();
  const [searchControls, setSearchControls] = useState<SearchControls>({});

  useEffect(() => {
    setMessageBoxRef(
      Array(toShowConversation.length)
        .fill(undefined)
        .map(() => createRef()),
    );
    onOpen();
  }, [onOpen, toShowConversation]);

  const handleFilterMessagesBySearch = (
    inputEvent: ChangeEvent<HTMLInputElement>,
  ) => {
    inputEvent.preventDefault();
    const searchedValue = inputEvent.target.value;

    if (!searchedValue) {
      setSearchControls({});
      return;
    }

    setSearch(searchedValue);

    const searchedValuesIndex = [
      ...data
        .map(
          (data, index) =>
            data.data.toLowerCase().includes(searchedValue.toLowerCase()) &&
            index,
        )
        .filter(Boolean)
        .reverse(),
    ];

    const searchedValuesPosition = messageBoxRef
      .filter((_, index) => searchedValuesIndex.includes(index))
      .filter(Boolean)
      .map((boxRef) => boxRef.current?.offsetTop);

    const newSearchControls = {
      searchedValuesIndex,
      searchedValuesPosition,
      searchedValue,
      currentPosition: searchedValuesPosition[0],
    };

    setSearchControls(newSearchControls);

    getPositions(newSearchControls);
  };

  const scrollUntilPosition = useCallback((top) => {
    if (top) {
      messagesContainerRef.current.scrollTo({ top });
    }
  }, []);

  const getPositions = (newSearchControls) => {
    getNextPosition(newSearchControls);
    getPreviousPosition(newSearchControls);
  };

  const getNextPosition = useCallback((newSearchControls) => {
    const { searchedValuesPosition, currentPosition } = newSearchControls;
    const nextPosition = searchedValuesPosition?.slice(
      searchedValuesPosition.indexOf(currentPosition),
      searchedValuesPosition.length,
    );

    setSearchControls((oldValue) => ({
      ...oldValue,
      nextPosition: nextPosition?.length,
    }));
  }, []);

  const getPreviousPosition = useCallback((newSearchControls) => {
    const { searchedValuesPosition, currentPosition } = newSearchControls;
    const previousPosition = searchedValuesPosition?.slice(
      0,
      searchedValuesPosition.indexOf(currentPosition),
    );

    setSearchControls((oldValue) => ({
      ...oldValue,
      previousPosition: previousPosition?.length,
    }));
  }, []);

  const handleChangePosition = (type: 'add' | 'substract' = 'add') => {
    setSearchControls((oldValue) => {
      const currentPositionIndex = oldValue.searchedValuesPosition.findIndex(
        (position) => position === oldValue.currentPosition,
      );

      const typeChangeValue = type === 'add' ? 1 : -1;

      const currentPosition =
        oldValue.searchedValuesPosition[currentPositionIndex + typeChangeValue];

      const newSearchControls = { ...oldValue, currentPosition };
      getPositions(newSearchControls);
      scrollUntilPosition(currentPosition);
      return newSearchControls;
    });
  };

  const handleFilterByDate = useCallback(
    (messageDate: string) => {
      const newFilterByDate = {
        ...datesFilter,
        [messageDate]: !Boolean(datesFilter[messageDate]),
      };
      setDatesFilter(newFilterByDate);
      setToShowConversation(() => {
        const selectedDates = Object.entries(newFilterByDate)
          .filter(([_, value]) => value)
          .map(([key]) => key);

        return selectedDates.length
          ? data.filter(({ messageDate }) =>
              selectedDates.includes(messageDate.split(' ')[0]),
            )
          : data;
      });
    },
    [datesFilter, data],
  );

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
                  <TabPanel overflow="hidden">
                    <Text fontSize="md" color="gray.300">
                      Contatos participantes da conversas.
                    </Text>
                    <Text fontSize="xs">
                      Para destacar as mensagens desse contato basta clicar que
                      as mensagens enviadas por ele serão destacadas em tela
                    </Text>
                    <List spacing={3} mt={4} overflow="auto" h="100%">
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
                          {highLightContact === writterName ? (
                            <ListIcon as={RiStarSFill} />
                          ) : (
                            <ListIcon as={RiUserLine} />
                          )}
                          {writterName}
                        </ListItem>
                      ))}
                    </List>
                  </TabPanel>
                  <TabPanel>
                    <Text fontSize="md" color="gray.300">
                      Datas onde as conversas ocorreram.
                    </Text>
                    <Text fontSize="xs">
                      Para destacar as mensagens de alguma data, basta clicar
                      que as mensagens na respectiva data selecionada serão
                      destacadas em tela
                    </Text>
                    <CheckboxGroup colorScheme="pink">
                      <List spacing={3} mt={4} overflow="auto" h="100%">
                        {messagesDate.map((messageDate) => (
                          <Box key={messageDate}>
                            <ListItem as="button">
                              <ListIcon as={RiCalendarLine} />
                              <Checkbox
                                value={messageDate}
                                checked={Boolean(datesFilter[messageDate])}
                                onChange={() => handleFilterByDate(messageDate)}
                              >
                                {messageDate}-
                                {Boolean(datesFilter[messageDate])
                                  ? 'Sim'
                                  : 'Não'}
                              </Checkbox>
                            </ListItem>
                          </Box>
                        ))}
                      </List>
                      {JSON.stringify(datesFilter)}
                    </CheckboxGroup>
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
                    <Box
                      key={index}
                      w="100%"
                      bg="gray.700"
                      p={4}
                      borderRadius={4}
                      my={4}
                      borderLeftColor="pink.500"
                      borderLeftWidth="4px"
                      color="gray.400"
                    >
                      <Text>{message.data}</Text>
                      <HStack
                        justifyContent="space-between"
                        alignItems="flex-end"
                      >
                        <Text
                          fontSize={12}
                          mt={2}
                          textAlign="end"
                          color="gray.500"
                        >
                          Mensagem padrão do aplicativo
                        </Text>
                        <Text
                          fontSize={12}
                          mt={2}
                          textAlign="end"
                          color="pink.600"
                        >
                          {message.messageDate}
                        </Text>
                      </HStack>
                    </Box>
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
                      {mainContact === message.writterName ? (
                        <Box
                          maxW="80%"
                          minW="70%"
                          bg="pink.500"
                          p={4}
                          borderRadius={4}
                          alignSelf="flex-end"
                          ref={messageBoxRef[index]}
                        >
                          <Text
                            fontSize={18}
                            fontWeight="medium"
                            color="gray.900"
                          >
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
                          ref={messageBoxRef[index]}
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
                  )}
                </>
              ))}
          </Flex>
        </Flex>
        <Flex bg="gray.800" px={4} py={4}>
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
            flex="1"
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
          <Flex
            alignItems="center"
            opacity={
              searchControls.searchedValuesPosition?.length ? '1' : '0.2'
            }
          >
            <Button
              variant="unstyled"
              display="flex"
              onClick={() => handleChangePosition('add')}
              disabled={
                !searchControls.nextPosition ||
                searchControls?.nextPosition === 1
              }
            >
              <Icon as={RiArrowDownLine} />
              <Text fontSize="xs">{searchControls?.previousPosition || 0}</Text>
            </Button>
            /
            <Button
              variant="unstyled"
              display="flex"
              onClick={() => handleChangePosition('substract')}
              disabled={
                !searchControls.previousPosition ||
                searchControls?.previousPosition ===
                  searchControls.searchedValuesPosition?.length
              }
            >
              <Icon as={RiArrowUpLine} />
              <Text fontSize="xs">{searchControls?.nextPosition || 0}</Text>
            </Button>
            <Badge colorScheme="gray" ml={2}>
              Total de {searchControls.searchedValuesPosition?.length || 0}
            </Badge>
          </Flex>
        </Flex>
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
