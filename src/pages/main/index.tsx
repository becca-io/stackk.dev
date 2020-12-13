import { Button } from '@chakra-ui/react';
import Layout from 'components/Layout';
import React from 'react';
import { signIn, signOut, useSession } from 'next-auth/client';

export default function Main() {
  const [session, loading] = useSession();

  if (loading) {
    return <div>Loading</div>;
  }
  return (
    <Layout fullHeight>
      <div>Main</div>
      {session == null ? (
        <Button onClick={() => signIn()}>로그인</Button>
      ) : null}
      {session != null ? (
        <Button onClick={() => signOut()}>로그아웃</Button>
      ) : null}
    </Layout>
  );
}
