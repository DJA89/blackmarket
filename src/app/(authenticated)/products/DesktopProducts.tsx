'use client';

import DesktopFilters from '~/components/DesktopFilters';
import AllProductsListSection from '~/components/AllProductsListSection';
import { useSearchParams } from 'next/navigation';

export default function DesktopProducts() {
  const searchParams = useSearchParams();
  const search = searchParams?.get('search');

  return (
    <div className="hidden justify-center bg-background py-14 md:flex">
      <div className="flex">
        <DesktopFilters />
        <div className="flex w-full flex-col md:w-210">
          <div className="w-71 text-2xl">
            {search ? (
              <>
                You searched for
                <span className="font-bold">{`" ${search}"`}</span>
              </>
            ) : (
              <>{'All Products'}</>
            )}
          </div>
          <AllProductsListSection />
        </div>
      </div>
    </div>
  );
}
