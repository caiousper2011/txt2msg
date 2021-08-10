import { Flex, HStack, Text } from '@chakra-ui/react';
import Link from 'next/link';
import { ImportConversation } from '../ImportConversation';
export const Header: React.FC = () => {
  return (
    <Flex
      bg="gray.800"
      w="100vw"
      h={16}
      alignItems="center"
      p={8}
      boxShadow="xl"
      justifyContent="space-between"
    >
      <HStack display="flex" alignItems="flex-end" cursor="pointer">
        <Link href="/" passHref>
          <Text fontSize="2xl" fontWeight="light">
            ZAP conversor
          </Text>
        </Link>
        <Text
          as="span"
          fontSize="xl"
          fontWeight="bold"
          pb={0.5}
          color="pink.500"
        >
          .txt
        </Text>
      </HStack>
      <ImportConversation />
    </Flex>
  );
};
