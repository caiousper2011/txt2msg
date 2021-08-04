import {
  Box,
  Checkbox,
  CheckboxGroup,
  List,
  ListIcon,
  ListItem,
} from '@chakra-ui/react';
import { Dispatch, SetStateAction, useState } from 'react';
import { RiCalendarLine } from 'react-icons/ri';
import { useConversationFilters } from '../../contexts/ConversationFilters';

export interface FilterByDatesProps {
  messagesDate: string[];
}

export const FilterByDates: React.FC<FilterByDatesProps> = ({
  messagesDate,
}) => {
  const [datesFilter, setDatesFilter] = useState({});
  const { addFilter } = useConversationFilters();
  const handleFilterByDate = (messageDate: string) => {
    const newFilterByDate = {
      ...datesFilter,
      [messageDate]: !Boolean(datesFilter[messageDate]),
    };

    setDatesFilter(newFilterByDate);

    const dates = Object.entries(newFilterByDate)
      .filter(([_, value]) => value)
      .map(([key]) => key);

    addFilter({ dates });
  };

  return (
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
                {messageDate}
              </Checkbox>
            </ListItem>
          </Box>
        ))}
      </List>
      {JSON.stringify(datesFilter)}
    </CheckboxGroup>
  );
};
