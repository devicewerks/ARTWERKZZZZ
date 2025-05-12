"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

type SearchContextType = {
  searchQuery: string
  searchResults: any[]
  isSearching: boolean
  isSearchOpen: boolean
  setSearchQuery: (query: string) => void
  performSearch: () => void
  toggleSearch: () => void
}

const SearchContext = createContext<SearchContextType | undefined>(undefined)

// Mock artwork data for search
const mockArtworks = [
  {
    id: "1",
    name: "Summer Breeze",
    artist: "Jane Smith",
    type: "Abstract Painting",
    price: 1299,
    image: "https://images.unsplash.com/photo-1549887534-1541e9326642?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "2",
    name: "Urban Rhythm",
    artist: "Michael Chen",
    type: "Abstract Painting",
    price: 1499,
    image:
      "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "3",
    name: "Coastal Dreams",
    artist: "Sarah Johnson",
    type: "Landscape Painting",
    price: 1899,
    image:
      "https://images.unsplash.com/photo-1579783901586-d88db74b4fe4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "4",
    name: "Abstract Flow",
    artist: "David Williams",
    type: "Abstract Painting",
    price: 1699,
    image:
      "https://images.unsplash.com/photo-1571115764595-644a1f56a55c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "5",
    name: "Midnight Bloom",
    artist: "Emma Davis",
    type: "Abstract Painting",
    price: 1999,
    image:
      "https://images.unsplash.com/photo-1577720643272-265f09367456?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "6",
    name: "Serene Landscape",
    artist: "Thomas Anderson",
    type: "Landscape Painting",
    price: 2199,
    image: "https://images.unsplash.com/photo-1548516173-3cabfa4607e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "7",
    name: "Vibrant Composition",
    artist: "Olivia Martinez",
    type: "Abstract Painting",
    price: 1799,
    image: "https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "8",
    name: "City Lights",
    artist: "James Wilson",
    type: "Photography",
    price: 1299,
    image:
      "https://images.unsplash.com/photo-1500051638674-ff996a0ec29e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
]

export function SearchProvider({ children }: { children: ReactNode }) {
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  const performSearch = () => {
    if (!searchQuery.trim()) {
      setSearchResults([])
      return
    }

    setIsSearching(true)

    // Simulate API call with setTimeout
    setTimeout(() => {
      const query = searchQuery.toLowerCase()
      const results = mockArtworks.filter(
        (artwork) =>
          artwork.name.toLowerCase().includes(query) ||
          artwork.artist.toLowerCase().includes(query) ||
          artwork.type.toLowerCase().includes(query),
      )

      setSearchResults(results)
      setIsSearching(false)
    }, 500)
  }

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen)
    if (!isSearchOpen) {
      setSearchQuery("")
      setSearchResults([])
    }
  }

  return (
    <SearchContext.Provider
      value={{
        searchQuery,
        searchResults,
        isSearching,
        isSearchOpen,
        setSearchQuery,
        performSearch,
        toggleSearch,
      }}
    >
      {children}
    </SearchContext.Provider>
  )
}

export function useSearch() {
  const context = useContext(SearchContext)
  if (context === undefined) {
    throw new Error("useSearch must be used within a SearchProvider")
  }
  return context
}
