import { SetStateAction, useContext } from 'react';
import { useState } from 'react';
import { Dispatch } from 'react';
import { ReactNode } from 'react';
import { createContext } from 'react';
import { useConversation } from './ConversationContext';

const ConversationFiltersContext = createContext({} as ConversationFilter);

interface IFilters {
  dateFilters?: string[];
}

interface Message {
  writterName: string;
  messageDate: string;
  data: string;
  id: string;
}

interface ConversationFilter {
  addFilter: (filter: IFilters) => void;
  conversationFilters: IFilters;
  filteredMessages: Message[];
  highLightContact: string;
  handleHighlightContact: Dispatch<SetStateAction<string>>;
}

interface ConversationProviderProps {
  children: ReactNode;
}

export const ConversationFiltersProvider: React.FC<ConversationProviderProps> =
  ({ children }) => {
    const {
      conversation: { data: messages },
    } = useConversation();
    const [conversationFilters, setConversationFilters] = useState<IFilters>(
      {},
    );
    const [highLightContact, setHighLightContact] = useState('');
    const [filteredMessages, setFilteredMessages] = useState(messages);

    const dateFilters = (formattedMessages: Message[], dates: string) =>
      formattedMessages.filter((message) => {
        const [fullDayDate] = message.messageDate.split(' ');
        return dates.includes(fullDayDate);
      });

    const filterAvailable = {
      dateFilters,
    };

    const addFilter = (newFilter: IFilters) => {
      const filters = { ...conversationFilters, ...newFilter };
      setConversationFilters(filters);
      const processedMessages = Object.entries(filters).reduce(
        (formattedMessages, [filterName, filterValue]) => {
          const result = filterAvailable[filterName](
            formattedMessages,
            filterValue,
          );
          return result;
        },
        messages,
      );

      setFilteredMessages(processedMessages);
    };

    return (
      <ConversationFiltersContext.Provider
        value={{
          addFilter,
          conversationFilters,
          filteredMessages,
          highLightContact,
          handleHighlightContact: setHighLightContact,
        }}
      >
        {children}
      </ConversationFiltersContext.Provider>
    );
  };

export const useConversationFilters = () => {
  const conversationFiltersContent = useContext(ConversationFiltersContext);

  return conversationFiltersContent;
};
