import { HStack, ListIcon, ListItem, Text, List } from '@chakra-ui/react';
import { Dispatch, SetStateAction } from 'react';
import { RiStarSFill, RiUserLine } from 'react-icons/ri';

export interface FilterByContactsProps {
  mainContact: string;
  writtersName: string[];
  highLightContact: string;
  handleHighLightContact: Dispatch<SetStateAction<string>>;
}

const FilterByContacts: React.FC<FilterByContactsProps> = ({
  handleHighLightContact,
  writtersName,
  mainContact,
  highLightContact,
}) => {
  return (
    <List spacing={3} mt={4} overflow="auto" h="100%">
      {writtersName.map((writterName) => (
        <ListItem as="button" key={writterName}>
          <HStack
            color={mainContact === writterName ? 'gray.100' : 'gray.300'}
            onClick={() =>
              handleHighLightContact((oldWritter: string) => {
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

export default FilterByContacts;
