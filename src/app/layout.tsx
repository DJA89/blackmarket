import { DM_Sans } from 'next/font/google';

import './globals.css';

const fontDMSans = DM_Sans({
  weight: ['400', '700'],
  subsets: ['latin'],
});

export const metadata = {
  title: "Dja's Blackmarket",
  description: 'Practice project',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={fontDMSans.className}>
      <body>{children}</body>
    </html>
  );
}
