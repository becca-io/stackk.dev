import { Global } from '@emotion/react';
import CapturedError from 'components/errors/CapturedError';
import ErrorBoundary from 'components/errors/ErrorBoundary';
import { ModalProvider } from 'hooks/useModal';
import React from 'react';
import {
  QueryCache,
  ReactQueryCacheProvider,
  ReactQueryErrorResetBoundary,
} from 'react-query';
import { nomralizeCss } from 'styles/normalizeCss';
import { ChakraProvider } from '@chakra-ui/react';
import Head from 'next/head';

const queryCache = new QueryCache({
  defaultConfig: {
    queries: {
      suspense: true,
    },
  },
});

export default function App({ Component, pageProps }: any) {
  return (
    <ReactQueryErrorResetBoundary>
      {({ reset }) => {
        return (
          <ErrorBoundary
            onReset={reset}
            renderFallback={({ error, reset }) => {
              return <CapturedError error={error} onResetError={reset} />;
            }}
          >
            <ReactQueryCacheProvider queryCache={queryCache}>
              <ChakraProvider>
                <ModalProvider>
                  <Global styles={nomralizeCss} />
                  <Head>
                    <title>Stackk.dev</title>
                  </Head>
                  <Component {...pageProps} />
                </ModalProvider>
              </ChakraProvider>
            </ReactQueryCacheProvider>
          </ErrorBoundary>
        );
      }}
    </ReactQueryErrorResetBoundary>
  );
}
