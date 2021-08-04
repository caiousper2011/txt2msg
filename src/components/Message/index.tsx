import { Box, HStack, Text, ChakraComponent, BoxProps } from '@chakra-ui/react';
import { Ref } from 'react';
import { FC } from 'react';

interface MessageProps extends BoxProps {
  message: {
    writterName: string;
    data: string;
    messageDate: string;
  };
  mainWritter: string;
  ref: Ref<HTMLDivElement>;
}

type BoxComponent = ChakraComponent<'div', MessageProps>;

export const Message: FC<MessageProps> = (({
  message,
  mainWritter,
  ...rest
}) => {
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
    <Box p={4} borderRadius={4} {...messageSettings} {...rest}>
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
}) as BoxComponent;
