import 'next-auth';

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface User {
    accessToken: string;
    client: string;
    uid: string;
    expiry: number;
    creator?: UserMetadata;
    company?: UserMetadata;
  }
  interface AdapterUser {
    accessToken: string;
    client: string;
    uid: string;
    expiry: number;
    creator?: UserMetadata;
    company?: UserMetadata;
  }
  interface Session {
    accessToken: string;
    client: string;
    uid: string;
    expiry: number;
    user?: User;
  }
}
