import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { paths } from '~/utils/paths';

const PUBLIC_PATHS = [paths.signIn, paths.signUp];

export default withAuth(
  async function middleware(req) {
    const token = await getToken({ req, secret: process.env.PROVIDER_SECRET });

    if (PUBLIC_PATHS.includes(req.nextUrl.pathname) && !!token) {
      return NextResponse.redirect(new URL(paths.home, req.url));
    }
  },
  {
    callbacks: {
      authorized: ({ req, token }) => {
        const pathname = req.nextUrl.pathname;
        const tokenPresent = !!token?.user?.accessToken;
        if (PUBLIC_PATHS.includes(pathname)) {
          return true;
        }

        return tokenPresent;
      },
    },
    secret: process.env.PROVIDER_SECRET,
  }
);
