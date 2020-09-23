import 'styles/global.scss';
import type { AppProps } from 'next/app';
import { Eco } from '@material-ui/icons';
import React from 'react';
import theme from 'theme';
import AppBar from '@components/AppBar/AppBar';
import { Grommet, Box, Heading, Image, Text } from 'grommet';
import Head from 'next/head';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <title>Leaves of Saas</title>
        <link rel='icon' href='/favicon.ico'></link>
      </Head>
      <Grommet theme={theme}>
        <Box fill>
          <AppBar>
            <Box direction='row' justify='start' align='center' gap='xxsmall'>
              <Eco />
              <Heading level='3' margin='none'>
                Leaves Of Saas
              </Heading>
            </Box>

            <Text size='xsmall'>Hello</Text>
          </AppBar>
          <Box
            direction='column'
            justify='center'
            align='center'
            flex
            margin='small'
          >
            <Component {...pageProps} />
          </Box>
        </Box>
      </Grommet>
    </>
  );
};

export default App;
