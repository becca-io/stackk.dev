import React, { Suspense, SuspenseProps } from 'react';
import isServer from 'utils/env/isServer';

export default function SSRSuspense(props: SuspenseProps) {
  return isServer() ? <>{props.fallback}</> : <Suspense {...props} />;
}
