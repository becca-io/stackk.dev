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
              <ModalProvider>
                <Global styles={nomralizeCss} />
                <Component {...pageProps} />
              </ModalProvider>
            </ReactQueryCacheProvider>
          </ErrorBoundary>
        );
      }}
    </ReactQueryErrorResetBoundary>
  );
}
