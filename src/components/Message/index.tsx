import { Box, HStack, Text, BoxProps } from '@chakra-ui/react';
import { forwardRef } from 'react';

interface MessageProps extends BoxProps {
  message: {
    writterName: string;
    data: string;
    messageDate: string;
  };
  mainWritter: string;
}

export const Message = forwardRef<HTMLDivElement, MessageProps>(
  ({ message, mainWritter, ...rest }, ref) => {
    const defaultMessageSettings: BoxProps = {
      bg: 'gray.900',
      maxW: '80%',
      minW: '45%',
      w: 'auto',
      color: 'gray.300',
      fontWeight: 'light',
    };

    const mainWritterMessageSettings: BoxProps = {
      alignSelf: 'flex-end',
      maxW: '80%',
      minW: '70%',
      bg: 'pink.500',
      color: 'gray.900',
      fontWeight: 'medium',
    };

    const messageSettings: BoxProps =
      mainWritter === message.writterName
        ? mainWritterMessageSettings
        : defaultMessageSettings;

    return (
      <Box
        p={4}
        borderRadius={4}
        as="div"
        {...messageSettings}
        ref={ref}
        {...rest}
      >
        <Text fontSize={18} color={messageSettings.color}>
          {message.data}
        </Text>
        <HStack
          justify="space-between"
          alignItems="flex-end"
          color={messageSettings.color}
        >
          <Text fontSize="xs" mt={4}>
            {message.messageDate}
          </Text>
          <Text fontSize="xs" mt={4}>
            {message.writterName}
          </Text>
        </HStack>
      </Box>
    );
  },
);

Message.displayName = 'Message';
