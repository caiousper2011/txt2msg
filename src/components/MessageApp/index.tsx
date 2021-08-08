import { Box, HStack, Text } from '@chakra-ui/react';

export interface MessageAppProps {
  message: {
    writterName: string;
    data: string;
    messageDate: string;
  };
}

export const MessageApp: React.FC<MessageAppProps> = ({ message }) => {
  return (
    <Box
      w="100%"
      bg="gray.700"
      p={4}
      borderRadius={4}
      my={4}
      borderLeftColor="pink.500"
      borderLeftWidth="4px"
      color="gray.400"
    >
      <Text>{message.data}</Text>
      <HStack justifyContent="space-between" alignItems="flex-end">
        <Text fontSize={12} mt={2} textAlign="end" color="gray.500">
          Mensagem padrão do aplicativo
        </Text>
        <Text fontSize={12} mt={2} textAlign="end" color="pink.600">
          {message.messageDate}
        </Text>
      </HStack>
    </Box>
  );
};
