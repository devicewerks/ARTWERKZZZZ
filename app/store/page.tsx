"use client"

import { useState, useMemo } from "react"
import { SiteHeader } from "@/components/layout/site-header"
import { SiteFooter } from "@/components/layout/site-footer"
import { ProductCard } from "@/components/product/product-card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Search, Filter } from "lucide-react"

// Mock artwork data
const artworks = [
  {
    id: "1",
    name: "Summer Breeze",
    artist: "Jane Smith",
    type: "Abstract Painting",
    price: 1299,
    image: "https://images.unsplash.com/photo-1549887534-1541e9326642?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "abstract",
  },
  {
    id: "2",
    name: "Urban Rhythm",
    artist: "Michael Chen",
    type: "Abstract Painting",
    price: 1499,
    image:
      "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "abstract",
  },
  {
    id: "3",
    name: "Coastal Dreams",
    artist: "Sarah Johnson",
    type: "Landscape Painting",
    price: 1899,
    image:
      "https://images.unsplash.com/photo-1579783901586-d88db74b4fe4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "landscape",
  },
  {
    id: "4",
    name: "Abstract Flow",
    artist: "David Williams",
    type: "Abstract Painting",
    price: 1699,
    image:
      "https://images.unsplash.com/photo-1571115764595-644a1f56a55c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "abstract",
  },
  {
    id: "5",
    name: "Midnight Bloom",
    artist: "Emma Davis",
    type: "Abstract Painting",
    price: 1999,
    image:
      "https://images.unsplash.com/photo-1577720643272-265f09367456?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "abstract",
  },
  {
    id: "6",
    name: "Serene Landscape",
    artist: "Thomas Anderson",
    type: "Landscape Painting",
    price: 2199,
    image: "https://images.unsplash.com/photo-1548516173-3cabfa4607e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "landscape",
  },
  {
    id: "7",
    name: "Vibrant Composition",
    artist: "Olivia Martinez",
    type: "Abstract Painting",
    price: 1799,
    image: "https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "abstract",
  },
  {
    id: "8",
    name: "City Lights",
    artist: "James Wilson",
    type: "Photography",
    price: 1299,
    image:
      "https://images.unsplash.com/photo-1500051638674-ff996a0ec29e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "photography",
  },
]

export default function StorePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("featured")
  const [filterBy, setFilterBy] = useState("all")

  const filteredAndSortedArtworks = useMemo(() => {
    let filtered = artworks

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(
        (artwork) =>
          artwork.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          artwork.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
          artwork.type.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    // Filter by category
    if (filterBy !== "all") {
      filtered = filtered.filter((artwork) => artwork.category === filterBy)
    }

    // Sort
    switch (sortBy) {
      case "price-low":
        return [...filtered].sort((a, b) => a.price - b.price)
      case "price-high":
        return [...filtered].sort((a, b) => b.price - a.price)
      case "name":
        return [...filtered].sort((a, b) => a.name.localeCompare(b.name))
      case "artist":
        return [...filtered].sort((a, b) => a.artist.localeCompare(b.artist))
      default:
        return filtered
    }
  }, [searchQuery, sortBy, filterBy])

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <SiteHeader />

      <main className="flex-1 py-8">
        <div className="container px-4 mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-semibold text-[#1d1d1f] mb-4">Art Store</h1>
            <p className="text-lg text-[#86868b]">Discover exceptional artwork from talented artists worldwide</p>
          </div>

          {/* Filters and Search */}
          <div className="mb-8 flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search artworks, artists, or styles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterBy} onValueChange={setFilterBy}>
              <SelectTrigger className="w-full sm:w-48">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="abstract">Abstract</SelectItem>
                <SelectItem value="landscape">Landscape</SelectItem>
                <SelectItem value="photography">Photography</SelectItem>
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="name">Name A-Z</SelectItem>
                <SelectItem value="artist">Artist A-Z</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Results */}
          <div className="mb-4">
            <p className="text-sm text-[#86868b]">
              Showing {filteredAndSortedArtworks.length} of {artworks.length} artworks
            </p>
          </div>

          {/* Artwork Grid */}
          {filteredAndSortedArtworks.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredAndSortedArtworks.map((artwork) => (
                <ProductCard key={artwork.id} product={artwork} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-lg text-[#86868b] mb-4">No artworks found matching your criteria</p>
              <Button
                onClick={() => {
                  setSearchQuery("")
                  setFilterBy("all")
                  setSortBy("featured")
                }}
                variant="outline"
                className="rounded-full"
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}
