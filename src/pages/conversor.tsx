import {
  Badge,
  Box,
  Button,
  calc,
  Flex,
  HStack,
  Icon,
  Input,
  Text,
  Stack,
} from '@chakra-ui/react';
import { RiGroupLine, RiMenuLine, RiSearchLine } from 'react-icons/ri';
import { theme } from '../styles/theme';
const Conversor: React.FC = () => {
  return (
    <Flex
      w={calc.subtract('100vw', `${theme.space}`)}
      h={calc.subtract('100vh', '110px')}
      mt={6}
      mx={6}
      bg="gray.800"
      borderRadius={4}
      flexDirection="column"
    >
      <HStack
        alignItems="center"
        bg="pink.500"
        p={4}
        borderTopRadius={4}
        boxShadow="md"
      >
        <HStack>
          <Button variant="unstyled">
            <Icon as={RiMenuLine} fontSize={24} />
          </Button>
          <Text fontSize={20} fontWeight="light">
            Conversas renderizadas
          </Text>
        </HStack>
        <Badge>11 95287-5150</Badge>
      </HStack>
      <Flex
        flex="1"
        flexDirection="column"
        alignItems="flex-start"
        px={4}
        py={2}
      >
        <Box maxW="80%" minW="60%" bg="gray.900" p={4} my={2} borderRadius={4}>
          <Text fontSize={18} color="gray.300">
            Olá meu nome é Caio barbosa de Almeida Olá meu nome é Caio barbosa
            de Almeida Olá meu nome é Caio barbosa de Almeida Olá meu nome é
            Caio barbosa de Almeida
          </Text>
        </Box>
        <Box
          maxW="80%"
          minW="60%"
          bg="pink.300"
          p={4}
          my={2}
          borderRadius={4}
          alignSelf="flex-end"
        >
          <Text fontSize={18} color="gray.900">
            Olá meu nome é Caio barbosa de Almeida Olá meu nome é Caio barbosa
            de Almeida Olá meu nome é Caio barbosa de Almeida Olá meu nome é
            Caio barbosa de Almeida
          </Text>
        </Box>
      </Flex>
      <Box bg="gray.800" px={4} py={4}>
        <Flex
          as="label"
          py="3"
          pl={2}
          pr={4}
          alignItems="center"
          color="gray.200"
          position="relative"
          bg="gray.900"
          borderRadius="full"
        >
          <Input
            color="gray.50"
            variant="unstyled"
            placeholder="Buscar mensagem"
            _placeholder={{ color: 'gray.400' }}
            px="4"
            mr="4"
          />
          <Icon as={RiSearchLine} fontSize="20" />
        </Flex>
      </Box>
    </Flex>
  );
};

export default Conversor;
