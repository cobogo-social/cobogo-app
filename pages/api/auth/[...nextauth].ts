import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

async function refreshAccessToken(token) {
  try {
    const url = `https://oauth2.googleapis.com/token?${new URLSearchParams({
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      grant_type: 'refresh_token',
      refresh_token: token.refreshToken,
    })}`;

    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      method: 'POST',
    });

    const refreshedTokens = await response.json();

    if (!response.ok) {
      throw refreshedTokens;
    }

    return {
      ...token,
      accessToken: refreshedTokens.access_token,
      accessTokenExpires: Date.now() + refreshedTokens.expires_in * 1000,
      refreshToken: refreshedTokens.refresh_token ?? token.refreshToken,
    };
  } catch (error) {
    return {
      ...token,
      error: 'RefreshAccessTokenError',
    };
  }
}

const options = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
          scope:
            'https://www.googleapis.com/auth/youtube.readonly https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile',
        },
      },
    }),
  ],
  database: process.env.DATABASE_URL,
  secret: process.env.SECRET,
  callbacks: {
    async session({ session, token }) {
      session.user = token;
      session.error = token.error;

      return session;
    },
    async jwt({ token, user, account }) {
      if (account && user) {
        const response = await axios.get(
          `${process.env.COBOGO_API_URL}/api/auth/${account.provider}/callback?access_token=${account?.access_token}`,
        );

        token.youtubeAccessToken = account.access_token;
        token.cobogoAccessToken = response.data.jwt;
        token.accessToken = account.access_token;
        token.accessTokenExpires =
          Date.now() + Number(account.expires_in) * 1000;
        token.refreshToken = account.refresh_token;
      }

      if (Date.now() < token.accessTokenExpires) {
        return token;
      }

      return refreshAccessToken(token);
    },
  },
};

const Auth = (req: NextApiRequest, res: NextApiResponse) =>
  NextAuth(req, res, options);

export default Auth;
