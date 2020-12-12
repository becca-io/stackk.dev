import { css } from '@emotion/react';
import Layout from 'components/Layout';
import React from 'react';

interface Props {
  onResetError?(): void;
  error: Error;
}

export default function CapturedError({ error, onResetError }: Props) {
  return (
    <Layout>
      <div
        css={css`
          min-height: 100vh;
        `}
      >
        <div
          css={css`
            padding-bottom: 30em;
          `}
        >
          <div>오류가 발생했습니다.</div>
          <p>{error.message}</p>
          <button onClick={onResetError}>이전화면</button>
        </div>
      </div>
    </Layout>
  );
}
