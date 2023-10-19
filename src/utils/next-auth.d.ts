import 'next-auth';

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface User {
    accessToken: string;
    refreshToken: string;
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
declare module 'next-auth/jwt' {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    /** OpenID ID Token */
    idToken?: string;
    accessToken?: string;
    client?: string;
    uid?: string;
    exp?: number;
    user?: User;
  }
}
