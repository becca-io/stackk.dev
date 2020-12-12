import { css } from '@emotion/react';
import React, { ReactNode } from 'react';

interface Props {
  fullHeight?: boolean;
  toCenter?: boolean;
  children: ReactNode;
}

export default function Layout(props: Props) {
  return (
    <main
      css={[
        props.fullHeight
          ? css`
              height: calc(100vh - 240px);
              padding-bottom: 240px;
            `
          : null,
      ]}
    >
      {props.children}
    </main>
  );
}
