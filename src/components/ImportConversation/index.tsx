import { Button, HStack, Icon, Input, Text } from '@chakra-ui/react';
import { RiUploadLine } from 'react-icons/ri';
import { useRouter } from 'next/dist/client/router';
import { useConversation } from '../../contexts/ConversationContext';

export const ImportConversation: React.FC = () => {
  const { convertConversation } = useConversation();
  const router = useRouter();

  const handleSelectedConversationFile = async (newfile: File) => {
    const conversation = await newfile.text();

    if (convertConversation(conversation)) {
      router.push('/conversor');
      return;
    }

    alert('Erro na conversão');
    localStorage[`zapconversor@conversation:${1}`] = conversation;
  };

  return (
    <>
      <Button
        type="button"
        colorScheme="pink"
        outline="none"
        variant="outline"
        _hover={{
          bg: 'pink.50',
          transition: '0.2s',
        }}
        as="label"
        htmlFor="conversationFile"
      >
        <HStack>
          <Icon as={RiUploadLine} fontSize={16} />
          <Text
            display={{ base: 'none', md: 'block' }}
            textTransform="uppercase"
            fontSize="small"
          >
            Importar nova conversa
          </Text>
        </HStack>
      </Button>
      <Input
        hidden
        type="file"
        name="conversationFile"
        id="conversationFile"
        onChange={(e) => handleSelectedConversationFile(e.target.files[0])}
        multiple={false}
      />
    </>
  );
};
