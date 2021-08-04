import { useContext } from 'react';
import { useState } from 'react';
import { ReactNode } from 'react';
import { createContext } from 'react';

const ConversationFiltersContext = createContext({} as ConversationFilter);

interface IFilters {
  dates?: string[];
}

interface ConversationFilter {
  addFilter: (filter: IFilters) => void;
  conversationFilters: IFilters;
}

interface ConversationProviderProps {
  children: ReactNode;
}

export const ConversationFiltersProvider: React.FC<ConversationProviderProps> =
  ({ children }) => {
    const [conversationFilters, setConversationFilters] = useState<IFilters>(
      {},
    );

    const addFilter = (newFilter: IFilters) => {
      setConversationFilters({ ...conversationFilters, ...newFilter });
      console.log({ ...conversationFilters, ...newFilter });
    };

    return (
      <ConversationFiltersContext.Provider
        value={{
          addFilter,
          conversationFilters,
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
