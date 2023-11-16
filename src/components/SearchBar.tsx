'use client';

import InnerInput from './Input/InnerInput';
import { useSearch } from '~/hooks/useSearch';
import { useRouter } from 'next/navigation';

export default function SearchBar({
  extraClasses = '',
}: {
  extraClasses?: string;
}) {
  const [searchValue, setSearchValue] = useSearch();

  const router = useRouter();

  const handleSubmit = (event: any) => {
    event.preventDefault();
    router.push(`/products?search=${searchValue}`);
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full">
      <InnerInput
        name="Search"
        ariaLabel="Search"
        placeholder="Search for products"
        value={searchValue}
        extraClasses={`flex-1 ${extraClasses}`}
        handleChange={({ target: { value } }) => setSearchValue(value)}
      />
    </form>
  );
}
