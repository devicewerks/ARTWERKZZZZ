"use client"

import { useSearch } from "@/components/search/search-provider"
import { useCart } from "@/components/cart/cart-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { X, Search, Loader2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useRef } from "react"
import { formatPrice } from "@/lib/utils"

export function SearchDialog() {
  const { searchQuery, searchResults, isSearching, isSearchOpen, setSearchQuery, performSearch, toggleSearch } =
    useSearch()

  const { addItem } = useCart()
  const inputRef = useRef<HTMLInputElement>(null)

  // Focus input when dialog opens
  useEffect(() => {
    if (isSearchOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isSearchOpen])

  // Handle search on input change
  useEffect(() => {
    const handler = setTimeout(() => {
      if (searchQuery) {
        performSearch()
      }
    }, 300)

    return () => clearTimeout(handler)
  }, [searchQuery, performSearch])

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isSearchOpen) {
        toggleSearch()
      }
    }

    document.addEventListener("keydown", handleEscape)
    return () => document.removeEventListener("keydown", handleEscape)
  }, [isSearchOpen, toggleSearch])

  if (!isSearchOpen) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm">
      <div className="absolute inset-0" onClick={toggleSearch} aria-hidden="true" />

      <div className="absolute left-1/2 top-24 w-full max-w-2xl -translate-x-1/2 rounded-xl bg-white shadow-2xl animate-in fade-in-0 zoom-in-95">
        <div className="flex items-center border-b px-4 py-3">
          <Search className="mr-2 h-5 w-5 text-muted-foreground" />
          <Input
            ref={inputRef}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for artwork, artists, or styles..."
            className="flex-1 border-0 bg-transparent p-0 focus-visible:ring-0"
          />
          <Button variant="ghost" size="icon" onClick={toggleSearch} aria-label="Close search">
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="p-4">
          {isSearching ? (
            <div className="flex h-40 items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : searchQuery && searchResults.length === 0 ? (
            <div className="flex h-40 flex-col items-center justify-center">
              <p className="text-center text-lg font-medium">No results found</p>
              <p className="text-center text-sm text-muted-foreground">Try searching for something else</p>
            </div>
          ) : searchResults.length > 0 ? (
            <ScrollArea className="h-[400px] pr-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {searchResults.map((result) => (
                  <div key={result.id} className="flex gap-3 rounded-lg border p-3">
                    <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md bg-muted">
                      <Image src={result.image || "/placeholder.svg"} alt={result.name} fill className="object-cover" />
                    </div>

                    <div className="flex flex-1 flex-col">
                      <Link
                        href={`/artwork/${result.id}`}
                        className="text-sm font-medium hover:underline"
                        onClick={toggleSearch}
                      >
                        {result.name}
                      </Link>
                      <p className="text-xs text-muted-foreground">By {result.artist}</p>
                      <p className="text-xs text-muted-foreground">{result.type}</p>
                      <div className="mt-auto flex items-center justify-between">
                        <p className="text-sm font-medium">{formatPrice(result.price)}</p>
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-7 rounded-full text-xs"
                          onClick={() => {
                            addItem(result)
                            toggleSearch()
                          }}
                        >
                          Add to Bag
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          ) : (
            <div className="py-6">
              <h3 className="mb-2 text-sm font-medium">Popular Searches</h3>
              <div className="flex flex-wrap gap-2">
                {["Abstract", "Landscape", "Portrait", "Modern", "Photography"].map((term) => (
                  <Button
                    key={term}
                    variant="outline"
                    size="sm"
                    className="rounded-full"
                    onClick={() => setSearchQuery(term)}
                  >
                    {term}
                  </Button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
