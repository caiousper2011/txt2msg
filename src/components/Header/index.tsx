import { Button, Flex, HStack, Icon, Text, Input } from '@chakra-ui/react';
import { useRouter } from 'next/dist/client/router';
import { RiUploadLine } from 'react-icons/ri';
import { useConversation } from '../../contexts/ConversationContext';
import Link from 'next/link';

export interface HeaderProps {}

export const Header: React.FC<HeaderProps> = () => {
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
    <Flex
      bg="gray.800"
      w="100vw"
      h={16}
      alignItems="center"
      p={8}
      boxShadow="xl"
      justifyContent="space-between"
    >
      <HStack display="flex" alignItems="flex-end">
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
          <Text textTransform="uppercase" fontSize="small">
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
    </Flex>
  );
};
