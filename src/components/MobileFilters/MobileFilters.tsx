import { useSearchParams } from 'next/navigation';

export default function MobileFilters() {
  const searchParams = useSearchParams();
  const search = searchParams?.get('search');

  return (
    <div className="flex h-19 w-full flex-col px-4 py-3">
      <div className="text-lg">
        {search ? <>You searched for {`"${search}"`}</> : <>{'All Products'}</>}
      </div>
      <div></div>
    </div>
  );
}
