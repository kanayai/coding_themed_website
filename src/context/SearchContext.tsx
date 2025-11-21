import React, { createContext, useState, useContext, ReactNode, useCallback } from 'react';

interface SearchContextType {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  isSearchVisible: boolean;
  toggleSearchVisibility: () => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const SearchProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isSearchVisible, setIsSearchVisible] = useState<boolean>(false);

  const toggleSearchVisibility = useCallback(() => {
    setIsSearchVisible(prev => !prev);
  }, []);

  return (
    <SearchContext.Provider value={{ searchTerm, setSearchTerm, isSearchVisible, toggleSearchVisibility }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
};
