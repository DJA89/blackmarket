'use client';

import { useMediaQuery } from 'react-responsive';

import MobileHeader from '~/layout/header/MobileHeader';
import DesktopHeader from '~/layout/header/DesktopHeader';
import Links from '~/layout/footer/Links';
import Link from 'next/link';
import MobileFooter from '~/layout/footer/MobileFooter';
import DesktopFooter from '~/layout/footer/DesktopFooter';

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
      <main className="h-139 md:h-67"></main>
      <footer className="h-138 w-full bg-black px-4 md:h-91">
        <div className="mx-auto w-88 py-9 sm:w-121 md:py-11 md:w-274">
          {isTabletOrMobile ? <MobileFooter /> : <DesktopFooter />}
        </div>
      </footer>
    </>
  );
}
