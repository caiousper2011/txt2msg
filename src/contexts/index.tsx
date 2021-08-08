import { ReactNode } from 'react';
import { ConversationProvider } from './ConversationContext';
import { ConversationFiltersProvider } from './ConversationFilters';
import { ChakraProvider } from '@chakra-ui/react';
import { theme } from '../styles/theme';

export interface ProvidersContainerProps {
  children: ReactNode;
}

const ProvidersContainer: React.FC<ProvidersContainerProps> = ({
  children,
}) => {
  return (
    <ChakraProvider theme={theme}>
      <ConversationProvider>
        <ConversationFiltersProvider>{children}</ConversationFiltersProvider>
      </ConversationProvider>
    </ChakraProvider>
  );
};

export default ProvidersContainer;
