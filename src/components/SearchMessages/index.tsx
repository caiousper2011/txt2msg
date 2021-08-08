import { Badge, Button, Flex, Icon, Input, Text } from '@chakra-ui/react';
import { Dispatch, SetStateAction, useCallback } from 'react';
import { MutableRefObject } from 'react';
import { ChangeEvent, useState } from 'react';
import { RiArrowDownLine, RiArrowUpLine, RiSearchLine } from 'react-icons/ri';

interface SearchControls {
  searchedValuesIndex?: number[];
  searchedValuesPosition?: number[];
  searchedValue?: string;
  currentPosition?: number;
  nextPosition?: number;
  previousPosition?: number;
}

export interface SearchMessagesProps {
  messagesBoxRef: MutableRefObject<HTMLDivElement>[];
  messages: Array<{
    writterName: string;
    messageDate: string;
    data: string;
  }>;
  messagesContainerRef: MutableRefObject<HTMLDivElement>;
  handleSearchValue: Dispatch<SetStateAction<string>>;
  search: string;
}

export const SearchMessages: React.FC<SearchMessagesProps> = ({
  messagesBoxRef,
  messages,
  messagesContainerRef,
  handleSearchValue,
  search,
}) => {
  const [searchControls, setSearchControls] = useState<SearchControls>({});

  const scrollUntilPosition = useCallback(
    (top) => {
      if (top) {
        messagesContainerRef.current.scrollTo({ top });
      }
    },
    [messagesContainerRef],
  );

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

  const getPositions = useCallback(
    (newSearchControls) => {
      getNextPosition(newSearchControls);
      getPreviousPosition(newSearchControls);
    },
    [getNextPosition, getPreviousPosition],
  );

  const getSearchValuesIndex = useCallback(
    (searchedValue: string) => [
      ...messages
        .map(
          (data, index) =>
            data.data.toLowerCase().includes(searchedValue.toLowerCase()) &&
            index,
        )
        .filter(Boolean)
        .reverse(),
    ],
    [messages],
  );

  const getSearchValuesPosition = useCallback(
    (searchedValuesIndex: number[]) =>
      messagesBoxRef
        .filter((_, index) => searchedValuesIndex.includes(index))
        .filter(Boolean)
        .map((boxRef) => boxRef.current?.offsetTop),
    [messagesBoxRef],
  );

  const handleFilterMessagesBySearch = useCallback(
    (inputEvent: ChangeEvent<HTMLInputElement>) => {
      inputEvent.preventDefault();
      const searchedValue = inputEvent.target.value;
      handleSearchValue(searchedValue);

      if (!searchedValue) {
        setSearchControls({});
        return;
      }

      const searchedValuesIndex = getSearchValuesIndex(searchedValue);
      const searchedValuesPosition =
        getSearchValuesPosition(searchedValuesIndex);

      const newSearchControls = {
        searchedValuesIndex,
        searchedValuesPosition,
        searchedValue,
        currentPosition: searchedValuesPosition[0],
      };

      setSearchControls(newSearchControls);
      getPositions(newSearchControls);
    },
    [
      getPositions,
      getSearchValuesIndex,
      getSearchValuesPosition,
      handleSearchValue,
    ],
  );

  return (
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
        opacity={searchControls.searchedValuesPosition?.length ? '1' : '0.2'}
      >
        <Button
          variant="unstyled"
          display="flex"
          onClick={() => handleChangePosition('add')}
          disabled={
            !searchControls.nextPosition || searchControls?.nextPosition === 1
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
  );
};
