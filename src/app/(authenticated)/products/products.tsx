'use client';

import MobileProducts from './MobileProducts';
import DesktopProducts from './DesktopProducts';
import { useMediaQuery } from 'react-responsive';

export default function Products() {
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 768px)' });

  return <>{isTabletOrMobile ? <MobileProducts /> : <DesktopProducts />}</>;
}
