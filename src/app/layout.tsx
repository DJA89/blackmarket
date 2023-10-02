import { DM_Sans } from 'next/font/google';
import { getServerSession } from 'next-auth';
import { authOptions } from '~/../pages/api/auth/[...nextauth]';
import { AuthLayoutProvider } from '~/hooks/useAuthLayout';
import AuthContext from '~/components/Providers/AuthContext';

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

  return (
    <html lang="en" className={fontDMSans.className}>
      <body className="bg-black">
        <AuthContext session={session}>
          <AuthLayoutProvider session={session}>{children}</AuthLayoutProvider>
        </AuthContext>
      </body>
    </html>
  );
}
