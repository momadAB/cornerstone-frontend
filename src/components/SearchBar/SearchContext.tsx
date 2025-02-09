"use client";

import { createContext, useContext, useState } from "react";

interface SearchContextType {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  searchType: string;
  setSearchType: (type: string) => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export function SearchProvider({ children }: { children: React.ReactNode }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchType, setSearchType] = useState("history"); // Default to history search

  return (
    <SearchContext.Provider
      value={{ searchQuery, setSearchQuery, searchType, setSearchType }}
    >
      {children}
    </SearchContext.Provider>
  );
}

// ✅ Custom Hook for Easier Usage
export function useSearch() {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useSearch must be used within a SearchProvider");
  }
  return context;
}
