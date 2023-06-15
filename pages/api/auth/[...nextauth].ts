import { API } from '~/utils/constants';
import NextAuth, { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: AuthOptions = {
  pages: {
    signIn: '/sign-in',
    error: '/sign-in',
  },
  secret: process.env.PROVIDER_SECRET,
  callbacks: {
    async signIn({ user }) {
      if (user?.accessToken) {
        return true;
      }
      return false;
    },
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (credentials) {
          const { email, password } = credentials;
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}${API.signIn}`,
            {
              method: 'POST',
              body: JSON.stringify({ user: { email, password } }),
              headers: { 'Content-Type': 'application/json' },
            }
          );

          if (res.status >= 400) {
            let error = await res.json();
            throw new Error(error.error);
          }

          let user = await res.json();
          const accessToken = res.headers.get('access-token');
          const uid = res.headers.get('uid');
          const client = res.headers.get('client');
          const expiry = res.headers.get('expiry');
          // If no error and we have user data, return it
          if (res.ok && user) {
            user.accessToken = accessToken;
            user.uid = uid;
            user.client = client;
            user.expiry = expiry;

            return user;
          }
        }
        // Return null if user data could not be retrieved
        return null;
      },
    }),
  ],
};
export default NextAuth(authOptions);
