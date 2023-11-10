import { createContext, useContext, useState } from 'react';

const SearchContext = createContext<any>(null);

function SearchProvider(props: object) {
  const [search, setSearch] = useState('');

  const value = [search, setSearch];

  return <SearchContext.Provider value={value} {...props} />;
}

function useSearch() {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearch must be used within the SearchProvider');
  }

  return context;
}

export { SearchProvider, useSearch };
