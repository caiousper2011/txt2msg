import { HStack, ListIcon, ListItem, Text, List } from '@chakra-ui/react';
import { RiStarSFill, RiUserLine } from 'react-icons/ri';
import { useConversation } from '../../contexts/ConversationContext';
import { useConversationFilters } from '../../contexts/ConversationFilters';

export const FilterByContacts: React.FC = () => {
  const {
    conversation: { writtersName },
    mainContact,
  } = useConversation();
  const { highLightContact, handleHighlightContact } = useConversationFilters();

  return (
    <List spacing={3} mt={4} overflow="auto" h="100%">
      {writtersName.map((writterName) => (
        <ListItem as="button" key={writterName}>
          <HStack
            color={mainContact === writterName ? 'gray.100' : 'gray.300'}
            onClick={() =>
              handleHighlightContact((oldWritter: string) => {
                return oldWritter === writterName ? '' : writterName;
              })
            }
          >
            {highLightContact === writterName ? (
              <ListIcon as={RiStarSFill} />
            ) : (
              <ListIcon as={RiUserLine} />
            )}
            <Text>{writterName}</Text>
          </HStack>
        </ListItem>
      ))}
    </List>
  );
};
