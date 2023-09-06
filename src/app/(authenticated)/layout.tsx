'use client';

import { useMediaQuery } from 'react-responsive';

import MobileHeader from '~/layout/MobileHeader';
import DesktopHeader from '~/layout/DesktopHeader';
import Link from 'next/link';

export default function Layout() {
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 768px)' });

  return (
    <>
      <Link
        href="/#main"
        className="absolute left-0 z-10 m-3 -translate-y-16 rounded-lg border-2	border-status/success/500 bg-black p-3 px-8 text-white transition focus:translate-y-0"
      >
        Skip to main content
      </Link>
      <div className="fixed w-full bg-black">
        <div className="mx-auto max-w-360">
          {isTabletOrMobile ? <MobileHeader /> : <DesktopHeader />}
        </div>
      </div>
      <main></main>
    </>
  );
}
