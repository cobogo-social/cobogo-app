import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

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
  database: process.env.NEXT_PUBLIC_DATABASE_URL,
  secret: process.env.SECRET,
  callbacks: {
    session: async ({ session, token }) => {
      session.user = token;
      session.youtubeAccessToken = token.youtubeAccessToken;
      session.cobogoAccessToken = token.cobogoAccessToken;

      return session;
    },
    jwt: async ({ token, user, account }) => {
      if (user) {
        const response = await fetch(
          `${process.env.COBOGO_API_URL}/api/auth/${account.provider}/callback?access_token=${account?.access_token}`,
        );

        const data = await response.json();

        token.youtubeAccessToken = account.access_token;
        token.cobogoAccessToken = data.jwt;
      }

      return token;
    },
  },
};

const Auth = (req, res) => NextAuth(req, res, options);

export default Auth;
