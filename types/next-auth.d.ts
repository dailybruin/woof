import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface Profile {
    email_verified: boolean; // guaranteed for Google profiles
  }
}
