import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

export interface Session {
  jwt: string;
  user: {
    name: string;
    email: string;
    image: string;
  };
  id: number;
  expires: string;
}

export interface User {
  jwt: string;
  id: number;
  username: string;
}

export interface Account {
  id: number;
  provider: string;
  type: string;
  refreshToken: string;
  accessToken: string;
  accessTokenExpires: string;
}

export interface Token {
  jwt: string;
  id: number;
  email: string;
  name: string;
  picture: string;
}

const options = {
  providers: [
    Providers.GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  database: process.env.NEXT_PUBLIC_DATABASE_URL,
  session: {
    jwt: true,
  },
  debug: true,
  callbacks: {
    session: async (session: Session, user: User) => {
      session.jwt = user.jwt;
      session.id = user.id;

      return Promise.resolve(session);
    },
    jwt: async (token: Token, user: User, account: Account) => {
      const isSignIn = user ? true : false;

      if (isSignIn) {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/${account.provider}/callback?access_token=${account?.accessToken}`
        );

        const data = await response.json();

        token.jwt = data.jwt;
        token.id = data.user.id;
      }

      return Promise.resolve(token);
    },
  },
};

export default (req, res) => NextAuth(req, res, options);
