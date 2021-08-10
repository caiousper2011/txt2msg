import { Box, Text, BoxProps, Stack } from '@chakra-ui/react';
import { useEffect, useState, Fragment } from 'react';
import { forwardRef } from 'react';
import { useConversation } from '../../contexts/ConversationContext';

interface MessageProps extends BoxProps {
  message: {
    writterName: string;
    data: string;
    messageDate: string;
  };
  highLightWhenContains: string;
}

export const Message = forwardRef<HTMLDivElement, MessageProps>(
  ({ message, highLightWhenContains, ...rest }, ref) => {
    const { mainContact } = useConversation();
    const [formattedMessage, setFormattedMessage] = useState<
      (string | JSX.Element)[]
    >([message.data]);

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
      mainContact === message.writterName
        ? mainWritterMessageSettings
        : defaultMessageSettings;

    useEffect(() => {
      const breakByMatchedTextReg = new RegExp(
        `(${highLightWhenContains})`,
        'i',
      );

      const splitedMessage = message.data.split(breakByMatchedTextReg);

      setFormattedMessage(() => {
        if (!highLightWhenContains || splitedMessage.length === 1) {
          return splitedMessage;
        }

        const matchedValueAndTextFormatted = splitedMessage.map(
          (text, index) => {
            return index % 2 ? (
              <Text
                key={index}
                as="span"
                bg="yellow"
                color="black"
                fontWeight="bold"
              >
                {text}
              </Text>
            ) : (
              text
            );
          },
        );

        return matchedValueAndTextFormatted;
      });
    }, [message, highLightWhenContains]);

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
          {formattedMessage.map((content, index) => (
            <Fragment key={index}>{content}</Fragment>
          ))}
        </Text>
        <Box
          display="flex"
          justifyContent="space-between"
          color={messageSettings.color}
          flexDirection={{ base: 'column', sm: 'row' }}
          mt={4}
          fontSize="xs"
          aligItems="flex-end"
        >
          <Text>{message.messageDate}</Text>
          <Text>{message.writterName}</Text>
        </Box>
      </Box>
    );
  },
);

Message.displayName = 'Message';
