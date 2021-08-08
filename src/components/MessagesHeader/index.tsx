import { Button, HStack, Icon, Text } from '@chakra-ui/react';
import { RiCloseLine, RiMenuLine } from 'react-icons/ri';
import { useConversation } from '../../contexts/ConversationContext';

export interface MessagesHeaderProps {
  onMenuToggle: () => void;
  showMenu: boolean;
  openSelectMainContactDialog: () => void;
}

export const MessagesHeader: React.SFC<MessagesHeaderProps> = ({
  onMenuToggle,
  showMenu,
  openSelectMainContactDialog,
}) => {
  const { mainContact } = useConversation();
  return (
    <HStack
      alignItems="center"
      bg="gray.600"
      p={4}
      borderTopRadius={4}
      boxShadow="md"
      position="relative"
    >
      <Button variant="unstyled" onClick={onMenuToggle}>
        <Icon as={showMenu ? RiCloseLine : RiMenuLine} fontSize={24} />
      </Button>
      <Text
        as="button"
        fontSize={16}
        fontWeight="medium"
        onClick={openSelectMainContactDialog}
        title="Trocar contato principal"
      >
        {mainContact}
      </Text>
    </HStack>
  );
};
