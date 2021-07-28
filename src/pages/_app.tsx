import { AppProps } from 'next/dist/next-server/lib/router/router';
import { ChakraProvider } from '@chakra-ui/react';
import { theme } from '../styles/theme';
import Head from 'next/head';
import { Header } from '../components/Header';
import { Flex } from '@chakra-ui/react';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Head>
        <title>
          ZAP conversor | conversor de arquivo .txt em conversas de novo
        </title>
      </Head>
      <Flex>
        <Flex flexDirection="column">
          <Header />
          <Component {...pageProps} />
        </Flex>
      </Flex>
    </ChakraProvider>
  );
}

export default MyApp;
