import { SetStateAction, useContext } from 'react';
import { useState } from 'react';
import { Dispatch } from 'react';
import { ReactNode } from 'react';
import { createContext } from 'react';
import { useConversation } from './ConversationContext';

const ConversationFiltersContext = createContext({} as ConversationFilter);

interface IFilters {
  dates?: string[];
}

interface ConversationFilter {
  addFilter: (filter: IFilters) => void;
  conversationFilters: IFilters;
  filteredMessages: Array<{
    writterName: string;
    messageDate: string;
    data: string;
    id: string;
  }>;
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

    const filteredMessages = messages;

    const addFilter = (newFilter: IFilters) => {
      setConversationFilters({ ...conversationFilters, ...newFilter });
      console.log({ ...conversationFilters, ...newFilter });
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
