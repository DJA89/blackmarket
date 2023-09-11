import InnerInput from './Input/InnerInput';
import { useState } from 'react';

export default function SearchBar({
  extraClasses = '',
}: {
  extraClasses?: string;
}) {
  const [searchValue, setSearchValue] = useState('');

  return (
    <InnerInput
      name="Search"
      ariaLabel="Search"
      placeholder="Search for products"
      value={searchValue}
      extraClasses={`flex-1 ${extraClasses}`}
      handleChange={({ target: { value } }) => setSearchValue(value)}
    />
  );
}
