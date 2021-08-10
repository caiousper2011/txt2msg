import { AppProps } from 'next/dist/next-server/lib/router/router';
import Head from 'next/head';
import { Header } from '../components/Header';
import { Flex } from '@chakra-ui/react';
import ProvidersContainer from '../contexts';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ProvidersContainer>
      <Head>
        <title>
          ZAP conversor | conversor de arquivo .txt em conversas novamente
        </title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Flex>
        <Flex flexDirection="column">
          <Header />
          <Component {...pageProps} />
        </Flex>
      </Flex>
    </ProvidersContainer>
  );
}

export default MyApp;
