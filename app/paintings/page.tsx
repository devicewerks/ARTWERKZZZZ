"use client"

import { SiteHeader } from "@/components/layout/site-header"
import { SiteFooter } from "@/components/layout/site-footer"
import { ProductCard } from "@/components/product/product-card"

const paintings = [
  {
    id: "1",
    name: "Summer Breeze",
    artist: "Jane Smith",
    type: "Abstract Painting",
    price: 1299,
    image: "https://images.unsplash.com/photo-1549887534-1541e9326642?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
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
]

export default function PaintingsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <SiteHeader />

      <main className="flex-1 py-8">
        <div className="container px-4 mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-semibold text-[#1d1d1f] mb-4">Paintings</h1>
            <p className="text-lg text-[#86868b]">Explore our curated collection of original paintings</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {paintings.map((painting) => (
              <ProductCard key={painting.id} product={painting} />
            ))}
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}
