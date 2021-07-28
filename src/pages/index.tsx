import { Flex } from '@chakra-ui/react';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import { Header } from '../components/Header';

export default function Home() {
  return <div></div>;
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
  };
};
