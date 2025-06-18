"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

type SearchContextType = {
  isSearchOpen: boolean
  searchQuery: string
  toggleSearch: () => void
  setSearchQuery: (query: string) => void
  closeSearch: () => void
}

const SearchContext = createContext<SearchContextType | null>(null)

export function SearchProvider({ children }: { children: ReactNode }) {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen)
  }

  const closeSearch = () => {
    setIsSearchOpen(false)
  }

  const value: SearchContextType = {
    isSearchOpen,
    searchQuery,
    toggleSearch,
    setSearchQuery,
    closeSearch,
  }

  return <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
}

export function useSearch(): SearchContextType {
  const context = useContext(SearchContext)

  if (!context) {
    throw new Error("useSearch must be used within a SearchProvider")
  }

  return context
}
