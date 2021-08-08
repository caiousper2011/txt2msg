import { Box, Checkbox, List, ListIcon, ListItem } from '@chakra-ui/react';
import { useState } from 'react';
import { RiCalendarLine } from 'react-icons/ri';
import { useConversationFilters } from '../../contexts/ConversationFilters';
import { useConversation } from '../../contexts/ConversationContext';

export const FilterByDates: React.FC = () => {
  const {
    conversation: { messagesDate },
  } = useConversation();
  const { addFilter, conversationFilters } = useConversationFilters();
  const [datesFilter, setDatesFilter] = useState(() => {
    if (conversationFilters.dateFilters) {
      return conversationFilters.dateFilters.reduce((dateFilters, filter) => {
        dateFilters[filter] = Boolean(true);
        return dateFilters;
      }, {});
    }

    return {};
  });
  const handleFilterByDate = (messageDate: string) => {
    const newFilterByDate = {
      ...datesFilter,
      [messageDate]: !Boolean(datesFilter[messageDate]),
    };

    setDatesFilter(newFilterByDate);

    const dates = Object.entries(newFilterByDate)
      .filter(([_, value]) => value)
      .map(([key]) => key);

    addFilter({ dateFilters: dates });
  };

  return (
    <List spacing={3} mt={4} overflow="auto" h="100%">
      {messagesDate.map((messageDate) => (
        <Box key={messageDate}>
          <ListItem as="button">
            <ListIcon as={RiCalendarLine} />
            <Checkbox
              colorScheme="pink"
              value={messageDate}
              onChange={() => handleFilterByDate(messageDate)}
              isChecked={datesFilter[messageDate]}
            >
              {messageDate}
            </Checkbox>
          </ListItem>
        </Box>
      ))}
    </List>
  );
};
