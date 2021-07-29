import { useContext } from 'react';
import { useState } from 'react';
import { ReactNode } from 'react';
import { createContext } from 'react';
import { conversor } from '../utils/index';
import {
  get as getStorage,
  create as createStorage,
} from '../utils/localStorageData';

const ConversationContext = createContext({} as ConversationData);

interface IConversation {
  writtersName?: string[];
  data: Array<{
    writterName: string;
    messageDate: string;
    data: string;
  }>;
  messagesDate?: string[];
}

interface ConversationData {
  convertConversation: (fileContent: string) => boolean;
  conversation: IConversation;
}

interface ConversationProviderProps {
  children: ReactNode;
}

export const ConversationProvider: React.FC<ConversationProviderProps> = ({
  children,
}) => {
  const [conversation, setConversation] = useState<IConversation>(() => {
    const conversationStorage = getStorage('convertedConversation');

    if (conversationStorage) {
      return conversationStorage;
    }

    return {} as IConversation;
  });

  const conversorData = conversor();

  const convertConversation = (fileContent: string) => {
    const convertedConversation = conversorData.run(fileContent);
    setConversation(convertedConversation);
    createStorage({ convertedConversation });
    console.log(convertedConversation);

    return Boolean(conversation);
  };

  return (
    <ConversationContext.Provider
      value={{
        convertConversation,
        conversation,
      }}
    >
      {children}
    </ConversationContext.Provider>
  );
};

export const useConversation = () => {
  const conversationContent = useContext(ConversationContext);

  return conversationContent;
};
