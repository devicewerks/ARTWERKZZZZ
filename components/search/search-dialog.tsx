"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { useSearch } from "@/components/search/search-provider"
import { useState } from "react"

export function SearchDialog() {
  const { isSearchOpen, closeSearch, searchQuery, setSearchQuery } = useSearch()
  const [results, setResults] = useState<any[]>([])

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    // Mock search results
    if (query.length > 0) {
      setResults([
        { id: 1, name: "Ethereal Resonance", artist: "Aria Luminova", type: "Digital Art" },
        { id: 2, name: "Quantum Dreams", artist: "Neo Artist", type: "Sculpture" },
      ])
    } else {
      setResults([])
    }
  }

  return (
    <Dialog open={isSearchOpen} onOpenChange={closeSearch}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Search Artworks</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search for artworks, artists, or collections..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-10"
            />
          </div>

          {results.length > 0 && (
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {results.map((result) => (
                <div key={result.id} className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                  <h4 className="font-medium">{result.name}</h4>
                  <p className="text-sm text-gray-600">
                    by {result.artist} • {result.type}
                  </p>
                </div>
              ))}
            </div>
          )}

          {searchQuery && results.length === 0 && (
            <div className="text-center py-8 text-gray-500">No results found for "{searchQuery}"</div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
