import NextAuth, { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
        },
      },
    }),
  ],
  callbacks: {
    async signIn({ account, profile }) {
      return Boolean(
        account?.provider === 'google' &&
          profile?.email &&
          profile.email_verified &&
          profile.email.endsWith(`@${process.env.EMAIL_DOMAIN}`) &&
          profile.email.endsWith('.ucla.edu'),
      );
    },
  },
};
export default NextAuth(authOptions);
