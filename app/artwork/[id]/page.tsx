"use client"

import { useState } from "react"
import { SiteHeader } from "@/components/layout/site-header"
import { SiteFooter } from "@/components/layout/site-footer"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from "next/image"
import { useCart } from "@/components/cart/cart-provider"
import { formatPrice } from "@/lib/utils"
import { notFound } from "next/navigation"

// Mock artwork data
const artworks = [
  {
    id: "1",
    name: "Summer Breeze",
    artist: "Jane Smith",
    type: "Abstract Painting",
    price: 1299,
    image: "https://images.unsplash.com/photo-1549887534-1541e9326642?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description:
      "A vibrant abstract piece that captures the essence of summer with warm colors and dynamic brushstrokes. This artwork brings energy and life to any space.",
    dimensions: "36 × 48 inches",
    medium: "Acrylic on canvas",
    year: "2023",
    framing: ["Unframed", "Black Frame", "White Frame", "Floating Frame"],
    relatedArtworks: ["2", "4", "7"],
  },
  {
    id: "2",
    name: "Urban Rhythm",
    artist: "Michael Chen",
    type: "Abstract Painting",
    price: 1499,
    image:
      "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description:
      "Inspired by the pulse of city life, this piece uses geometric patterns and bold colors to evoke the energy of urban environments.",
    dimensions: "30 × 40 inches",
    medium: "Oil on canvas",
    year: "2022",
    framing: ["Unframed", "Black Frame", "White Frame", "Floating Frame"],
    relatedArtworks: ["1", "4", "5"],
  },
  {
    id: "3",
    name: "Coastal Dreams",
    artist: "Sarah Johnson",
    type: "Landscape Painting",
    price: 1899,
    image:
      "https://images.unsplash.com/photo-1579783901586-d88db74b4fe4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description:
      "A serene coastal landscape that captures the tranquility of the ocean meeting the shore. Soft blues and gentle textures create a peaceful atmosphere.",
    dimensions: "40 × 60 inches",
    medium: "Oil on canvas",
    year: "2023",
    framing: ["Unframed", "Black Frame", "White Frame", "Floating Frame"],
    relatedArtworks: ["6", "8"],
  },
  {
    id: "4",
    name: "Abstract Flow",
    artist: "David Williams",
    type: "Abstract Painting",
    price: 1699,
    image:
      "https://images.unsplash.com/photo-1571115764595-644a1f56a55c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description:
      "Fluid forms and organic shapes create a sense of movement and flow in this abstract composition. The interplay of colors suggests natural elements in motion.",
    dimensions: "36 × 36 inches",
    medium: "Mixed media on canvas",
    year: "2022",
    framing: ["Unframed", "Black Frame", "White Frame", "Floating Frame"],
    relatedArtworks: ["1", "2", "5"],
  },
  {
    id: "5",
    name: "Midnight Bloom",
    artist: "Emma Davis",
    type: "Abstract Painting",
    price: 1999,
    image:
      "https://images.unsplash.com/photo-1577720643272-265f09367456?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description:
      "Deep blues and purples create a mysterious nocturnal atmosphere, with floral elements emerging from the darkness. A contemplative piece that rewards extended viewing.",
    dimensions: "48 × 48 inches",
    medium: "Acrylic on canvas",
    year: "2023",
    framing: ["Unframed", "Black Frame", "White Frame", "Floating Frame"],
    relatedArtworks: ["2", "4", "7"],
  },
  {
    id: "6",
    name: "Serene Landscape",
    artist: "Thomas Anderson",
    type: "Landscape Painting",
    price: 2199,
    image: "https://images.unsplash.com/photo-1548516173-3cabfa4607e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description:
      "A peaceful landscape capturing the golden light of late afternoon across rolling hills. The composition balances detail with atmospheric perspective.",
    dimensions: "36 × 48 inches",
    medium: "Oil on canvas",
    year: "2022",
    framing: ["Unframed", "Black Frame", "White Frame", "Floating Frame"],
    relatedArtworks: ["3", "8"],
  },
  {
    id: "7",
    name: "Vibrant Composition",
    artist: "Olivia Martinez",
    type: "Abstract Painting",
    price: 1799,
    image: "https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description:
      "Bold colors and dynamic forms create a vibrant composition that energizes any space. The interplay of shapes creates a sense of movement and rhythm.",
    dimensions: "40 × 40 inches",
    medium: "Acrylic on canvas",
    year: "2023",
    framing: ["Unframed", "Black Frame", "White Frame", "Floating Frame"],
    relatedArtworks: ["1", "4", "5"],
  },
  {
    id: "8",
    name: "City Lights",
    artist: "James Wilson",
    type: "Photography",
    price: 1299,
    image:
      "https://images.unsplash.com/photo-1500051638674-ff996a0ec29e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description:
      "A stunning nighttime cityscape capturing the vibrant energy of urban life through light and shadow. The long exposure creates streaks of light that suggest movement and vitality.",
    dimensions: "24 × 36 inches",
    medium: "Archival pigment print",
    year: "2022",
    framing: ["Unframed", "Black Frame", "White Frame", "Floating Frame"],
    relatedArtworks: ["3", "6"],
  },
]

export default function ArtworkPage({ params }: { params: { id: string } }) {
  const { id } = params
  const artwork = artworks.find((art) => art.id === id)

  if (!artwork) {
    notFound()
  }

  const { addItem } = useCart()
  const [selectedFrame, setSelectedFrame] = useState(artwork.framing[0])

  // Find related artworks
  const relatedArtworkData = artwork.relatedArtworks
    .map((relatedId) => artworks.find((art) => art.id === relatedId))
    .filter(Boolean) as typeof artworks

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <SiteHeader />

      <main className="flex-1 py-8">
        <div className="container px-4 mx-auto">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {/* Artwork Image */}
            <div className="relative h-[400px] md:h-[600px] w-full overflow-hidden rounded-lg bg-gray-100">
              <Image
                src={artwork.image || "/placeholder.svg"}
                alt={artwork.name}
                fill
                className="object-contain"
                priority
              />
            </div>

            {/* Artwork Details */}
            <div className="flex flex-col">
              <h1 className="text-3xl font-semibold text-[#1d1d1f]">{artwork.name}</h1>
              <p className="mt-1 text-lg text-[#1d1d1f]">By {artwork.artist}</p>
              <p className="mt-4 text-2xl font-medium text-[#1d1d1f]">{formatPrice(artwork.price)}</p>

              <div className="mt-6">
                <h3 className="text-sm font-medium text-[#1d1d1f]">Framing Options</h3>
                <div className="mt-2 flex flex-wrap gap-2">
                  {artwork.framing.map((frame) => (
                    <Button
                      key={frame}
                      variant={selectedFrame === frame ? "default" : "outline"}
                      className="rounded-full"
                      onClick={() => setSelectedFrame(frame)}
                    >
                      {frame}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="mt-8 space-y-4">
                <Button
                  className="w-full rounded-full bg-[#0071e3] hover:bg-[#0077ED]"
                  onClick={() =>
                    addItem({
                      ...artwork,
                      name: `${artwork.name} (${selectedFrame})`,
                    })
                  }
                >
                  Add to Bag
                </Button>

                <Button variant="outline" className="w-full rounded-full">
                  Save to Favorites
                </Button>
              </div>

              <Tabs defaultValue="description" className="mt-8">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="description">Description</TabsTrigger>
                  <TabsTrigger value="details">Details</TabsTrigger>
                  <TabsTrigger value="shipping">Shipping</TabsTrigger>
                </TabsList>
                <TabsContent value="description" className="mt-4">
                  <p className="text-[#1d1d1f]">{artwork.description}</p>
                </TabsContent>
                <TabsContent value="details" className="mt-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Dimensions</span>
                      <span className="text-sm">{artwork.dimensions}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Medium</span>
                      <span className="text-sm">{artwork.medium}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Year</span>
                      <span className="text-sm">{artwork.year}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Type</span>
                      <span className="text-sm">{artwork.type}</span>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="shipping" className="mt-4">
                  <div className="space-y-4">
                    <p className="text-[#1d1d1f]">
                      All artwork is carefully packaged to ensure safe delivery. Standard shipping takes 5-7 business
                      days.
                    </p>
                    <p className="text-[#1d1d1f]">
                      Expedited shipping options are available at checkout. International shipping may take longer and
                      incur additional customs fees.
                    </p>
                    <p className="text-[#1d1d1f]">
                      For oversized items, special shipping arrangements may be required. Our team will contact you with
                      details.
                    </p>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>

          {/* Related Artworks */}
          {relatedArtworkData.length > 0 && (
            <div className="mt-16">
              <h2 className="text-2xl font-semibold text-center text-[#1d1d1f]">You May Also Like</h2>
              <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {relatedArtworkData.map((relatedArt) => (
                  <div key={relatedArt.id} className="group">
                    <div className="relative h-[250px] w-full overflow-hidden rounded-lg bg-gray-100">
                      <Image
                        src={relatedArt.image || "/placeholder.svg"}
                        alt={relatedArt.name}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <h3 className="mt-4 text-lg font-medium text-[#1d1d1f]">{relatedArt.name}</h3>
                    <p className="text-sm text-[#86868b]">By {relatedArt.artist}</p>
                    <p className="text-[#86868b]">{formatPrice(relatedArt.price)}</p>
                    <Button
                      className="mt-2 w-full rounded-full bg-[#0071e3] hover:bg-[#0077ED]"
                      onClick={() => addItem(relatedArt)}
                    >
                      Add to Bag
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}
