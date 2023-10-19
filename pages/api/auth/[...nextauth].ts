import { API, API_BASE_URL } from '~/utils/constants';
import NextAuth, { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: AuthOptions = {
  pages: {
    signIn: '/sign_in',
    error: '/sign_in',
  },
  secret: process.env.PROVIDER_SECRET,
  callbacks: {
    async signIn({ user }) {
      if (user?.accessToken) {
        return true;
      }
      return false;
    },
    async jwt({ token }) {
      if (token?.exp && Date.now() < token.exp * 1000) {
        try {
          const response = await fetch(
            `${API_BASE_URL}/dj-rest-auth/token/refresh/`,
            {
              headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
              body: new URLSearchParams({
                refresh: token.user.refreshToken,
              }),
              method: 'POST',
            }
          );

          const tokens = await response.json();

          if (!response.ok) throw tokens;

          return {
            ...token,
            user: { ...token.user, accessToken: tokens.access },
            exp: new Date(tokens.access_token_expiration).getTime(),
          };
        } catch (error) {
          // Return previous token on error
          console.log(error);
          return token;
        }
      }

      return token;
    },
    async session({ session, token }) {
      return { ...session, user: token.user };
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
              body: JSON.stringify({ email, password }),
              headers: { 'Content-Type': 'application/json' },
            }
          );

          if (res.status >= 400) {
            let error = await res.json();
            throw new Error(error.error);
          }

          let { user, access_token, refresh_token } = await res.json();

          // If no error and we have user data, return it
          if (res.ok && user) {
            user.accessToken = access_token;
            user.refreshToken = refresh_token;
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
