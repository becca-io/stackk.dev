import { Global } from '@emotion/react';
import { ModalProvider } from 'hooks/useModal';
import React from 'react';
import { nomralizeCss } from 'styles/normalizeCss';
import {
  QueryCache,
  ReactQueryCacheProvider,
  ReactQueryErrorResetBoundary,
} from 'react-query';
import ErrorBoundary from 'components/errors/ErrorBoundary';
import CapturedError from 'components/errors/CapturedError';

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
