import { Box, calc, Flex, Text } from '@chakra-ui/react';
import { GetStaticProps } from 'next';

export default function Home() {
  return (
    <Flex
      alignItems={{ base: 'flex-start', lg: 'center' }}
      h={calc.subtract('100vh', '64px')}
      gap={16}
      padding={8}
      justifyContent={{
        base: 'flex-start',
        lg: 'space-between',
      }}
      flexDirection={{
        base: 'column',
        lg: 'row',
      }}
      overflowY="auto"
      pt={{ base: 16, lg: 0 }}
    >
      <Box mb={{ base: 16, lg: 0 }} pr={{ lg: 16, xl: 80 }}>
        <Text fontSize="5xl" fontWeight="bold" textTransform="uppercase">
          Conversor de{' '}
          <Text as="span" color="pink.500">
            .txt
          </Text>{' '}
          em conversas
        </Text>

        <Text
          fontSize="2xl"
          fontWeight="light"
          textAlign="justify"
          mt={{ lg: 8 }}
        >
          Bem-vindo ao{' '}
          <Text as="span" color="pink.500">
            ZAP conversor
          </Text>
          , aqui você poderá converter sua conversa exportada em .TXT pelo
          Whatsapp em uma conversa legível novamente.
        </Text>
      </Box>
      <Box
        as="figure"
        w="100%"
        maxW={{ base: '100%', lg: '480px' }}
        bgImg="/talk_image.svg"
        minH={{ base: 'xs', lg: '480px' }}
        bgRepeat="no-repeat"
        bgSize={{
          base: 'cover',
          lg: 'contain',
        }}
        bgPosition={{ base: 'center', sm: 'center -150px', lg: 'center' }}
        borderRadius={4}
      ></Box>
    </Flex>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
    revalidate: 60 * 60 * 10,
  };
};
