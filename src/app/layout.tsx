import { DM_Sans } from 'next/font/google';
import { getServerSession } from 'next-auth';
import { authOptions } from '~/../pages/api/auth/[...nextauth]';
import { AuthLayoutProvider } from '~/hooks/useAuthLayout';
import { useApi } from '~/hooks/useApi';
import AuthContext from '~/components/Providers/AuthContext';
import { API } from '~/utils/constants';
import { RawUserResponse } from '~/utils/utils';

import './globals.css';

const fontDMSans = DM_Sans({
  weight: ['400', '700'],
  subsets: ['latin'],
});

export const metadata = {
  title: "Dja's Blackmarket",
  description: 'Practice project',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  const { doGet } = useApi({ session });
  let user: RawUserResponse | undefined;
  if (session) {
    user = await doGet<RawUserResponse>({
      endpoint: API.getUserProfile,
    });
  }
  return (
    <html lang="en" className={fontDMSans.className}>
      <body>
        <AuthContext session={session}>
          <AuthLayoutProvider session={session}>{children}</AuthLayoutProvider>
        </AuthContext>
      </body>
    </html>
  );
}
