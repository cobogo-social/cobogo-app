import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { readOrCreateAccountByOauth } from '@services/cobogoApi';

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

export default NextAuth({
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
  secret: process.env.SECRET,
  callbacks: {
    // token
    // {
    //   name: 'Rafael Lima',
    //   email: 'rafaellimap-0513@pages.plusgoogle.com',
    //   picture: 'https://lh3.googleusercontent.com/a-/AOh14GiOeE2zrw1Matu_PqPCu1alpNmAowBAYgJELsdq=s96-c',
    //   sub: '107123731253517350373'
    // }
    // user
    // {
    //   id: '107123731253517350373',
    //   name: 'Rafael Lima',
    //   email: 'rafaellimap-0513@pages.plusgoogle.com',
    //   image: 'https://lh3.googleusercontent.com/a-/AOh14GiOeE2zrw1Matu_PqPCu1alpNmAowBAYgJELsdq=s96-c'
    // }
    // account
    // {
    //   provider: 'google',
    //   type: 'oauth',
    //   providerAccountId: '107123731253517350373',
    //   access_token: '',
    //   expires_at: 1654475615,
    //   refresh_token: '',
    //   scope: 'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile openid https://www.googleapis.com/auth/youtube.readonly',
    //   token_type: 'Bearer',
    //   id_token: ''
    // }
    async jwt({ token, user, account }) {
      if (account && user) {
        const strapiAccount = await readOrCreateAccountByOauth(user, account);

        return {
          provider: account.provider, // 'google'
          accessToken: account.access_token,
          accessTokenExpires: Date.now() + Number(account.expires_in) * 1000,
          refreshToken: account.refresh_token,
          user: { id: strapiAccount.id },
        };
      }

      if (Date.now() < token.accessTokenExpires) {
        return token;
      }

      return refreshAccessToken(token);
    },
    async session({ session, token }) {
      session.user = token.user;
      session.accessToken = token.accessToken;
      session.error = token.error;

      return session;
    },
  },
});
