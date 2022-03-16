import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

import cobogoApi from '../../../services/cobogoApi';
import youtubeApi from '../../../services/youtubeApi';

async function refreshAccessToken(token) {
  try {
    const url =
      'https://oauth2.googleapis.com/token?' +
      new URLSearchParams({
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        grant_type: 'refresh_token',
        refresh_token: token.refreshToken,
      });

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
  secret: 'secret',
  callbacks: {
    async jwt({ token, user, account }) {
      if (account && user) {
        return {
          accessToken: account.access_token,
          accessTokenExpires: Date.now() + Number(account.expires_in) * 1000,
          refreshToken: account.refresh_token,
          user,
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

      const readChannel = await youtubeApi.get(
        `/channels?part=snippet%2CbrandingSettings&mine=true`,
        {
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
          },
        }
      );

      const readProfileByChannelId = await cobogoApi.get(
        `/api/profiles?filters[channel_id][$eq]=${readChannel.data.items[0].id}`,
        {
          headers: {
            Authorization: `Bearer ${process.env.COBOGO_API_TOKEN}`,
          },
        }
      );

      const readAccountByEmail = await cobogoApi.get(
        `/api/accounts?filters[email][$eq]=${session.user.email}`,
        {
          headers: {
            Authorization: `Bearer ${process.env.COBOGO_API_TOKEN}`,
          },
        }
      );

      const readChannelByChannelId = await cobogoApi.get(
        `/api/channels?filters[channel_id][$eq]=${readChannel.data.items[0].id}`,
        {
          headers: {
            Authorization: `Bearer ${process.env.COBOGO_API_TOKEN}`,
          },
        }
      );

      session.youtubeChannels = readChannel.data.items;
      session.profiles = readProfileByChannelId.data.data;
      session.accounts = readAccountByEmail.data.data;
      session.channels = readChannelByChannelId.data.data;

      console.log(session);

      return session;
    },
  },
});
