import { SiteHeader } from "@/components/layout/site-header"
import { SiteFooter } from "@/components/layout/site-footer"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { ProductCard } from "@/components/product/product-card"
import { Headset } from "lucide-react"

// Mock artwork data
const featuredArtworks = [
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
]

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <SiteHeader />

      <main className="flex-1">
        {/* Hero Section - Mother's Day Style with Abstract Elements */}
        <section className="relative bg-[#f5f5f7] py-16 overflow-hidden">
          {/* Abstract decorative elements */}
          <div className="absolute inset-0 z-0">
            <div className="h-8 w-8 rounded-full bg-pink-400 absolute top-1/4 left-1/4 opacity-70"></div>
            <div className="h-12 w-12 rounded-full bg-yellow-400 absolute top-1/2 left-1/3 opacity-70"></div>
            <div className="h-10 w-10 rounded-full bg-orange-400 absolute top-1/3 right-1/4 opacity-70"></div>
            <div className="h-6 w-6 rounded-full bg-red-400 absolute top-1/4 left-2/3 opacity-70"></div>
            <div className="h-14 w-14 rounded-full bg-pink-300 absolute bottom-1/4 right-1/3 opacity-70"></div>

            {/* Squiggly lines */}
            <svg className="absolute left-1/5 top-1/3" width="80" height="20" viewBox="0 0 80 20">
              <path d="M0,10 Q20,20 40,10 Q60,0 80,10" stroke="#FF6B6B" strokeWidth="3" fill="none" />
            </svg>

            <svg className="absolute right-1/5 bottom-1/3" width="80" height="20" viewBox="0 0 80 20">
              <path d="M0,10 Q20,0 40,10 Q60,20 80,10" stroke="#FFD166" strokeWidth="3" fill="none" />
            </svg>

            {/* Decorative shapes */}
            <svg className="absolute left-1/3 top-1/5" width="30" height="30" viewBox="0 0 30 30">
              <polygon points="15,0 30,30 0,30" fill="#FF9A8B" opacity="0.7" />
            </svg>

            <svg className="absolute right-1/4 top-2/3" width="25" height="25" viewBox="0 0 25 25">
              <circle cx="12.5" cy="12.5" r="12.5" fill="#FF6B6B" opacity="0.7" />
            </svg>
          </div>

          <div className="relative z-10 mx-auto max-w-[600px] text-center">
            <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-[#1d1d1f]">Summer Collection</h1>
            <p className="mt-2 text-lg sm:text-xl text-[#1d1d1f]">
              It's not too late to find the perfect piece for your space.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/store">
                <Button className="rounded-full bg-[#0071e3] px-6 py-2 text-sm font-medium text-white hover:bg-[#0077ED]">
                  Shop
                </Button>
              </Link>
              <Link href="/metaverse">
                <Button
                  variant="outline"
                  className="rounded-full border-[#0071e3] px-6 py-2 text-sm font-medium text-[#0071e3] flex items-center gap-2"
                >
                  <Headset className="h-4 w-4" />
                  Enter Metaverse
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Metaverse Promo Section */}
        <section className="py-16 bg-gradient-to-b from-black to-[#1a1a1a] text-white">
          <div className="mx-auto max-w-[1000px] px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl sm:text-4xl font-semibold mb-4">Experience Art in the Metaverse</h2>
                <p className="text-gray-300 mb-6">
                  Step into our virtual gallery and explore artwork in an immersive 3D environment. View pieces from
                  every angle, interact with other art lovers, and purchase directly in the metaverse.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link href="/metaverse">
                    <Button className="rounded-full bg-[#0071e3] hover:bg-[#0077ED] flex items-center gap-2">
                      <Headset className="h-4 w-4" />
                      Enter Gallery
                    </Button>
                  </Link>
                  <Button variant="outline" className="rounded-full text-white border-white hover:bg-white/10">
                    Learn More
                  </Button>
                </div>
              </div>
              <div className="relative h-[300px] md:h-[400px] w-full rounded-lg overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10"></div>
                <Image
                  src="https://images.unsplash.com/photo-1626544827763-d516dce335e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                  alt="Virtual art gallery"
                  fill
                  className="object-cover"
                />
                <div className="absolute bottom-4 left-4 z-20">
                  <div className="bg-black/50 backdrop-blur-md rounded-lg px-3 py-2 text-sm">
                    Live Now: 24 Visitors in Gallery
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Divider */}
        <div className="h-[1px] bg-gray-200"></div>

        {/* Featured Collection - iPhone Style */}
        <section className="py-16 bg-white">
          <div className="mx-auto max-w-[600px] text-center">
            <h2 className="text-4xl sm:text-5xl font-semibold tracking-tight text-[#1d1d1f]">Abstract Series</h2>
            <p className="mt-2 text-lg sm:text-xl text-[#1d1d1f]">Meet our most vibrant collection yet.</p>
            <div className="mt-6 flex flex-col sm:flex-row justify-center gap-4 sm:space-x-4">
              <Link href="/collections/abstract">
                <Button className="w-full sm:w-auto rounded-full bg-[#0071e3] px-6 py-2 text-sm font-medium text-white hover:bg-[#0077ED]">
                  Learn more
                </Button>
              </Link>
              <Link href="/store/abstract">
                <Button
                  variant="outline"
                  className="w-full sm:w-auto mt-2 sm:mt-0 rounded-full border-[#0071e3] px-6 py-2 text-sm font-medium text-[#0071e3]"
                >
                  Shop Abstract
                </Button>
              </Link>
            </div>
            <p className="mt-3 text-sm text-[#6e6e73]">Created for artistic expression.</p>
          </div>

          <div className="mt-8 relative">
            <div className="mx-auto max-w-[1200px] px-4">
              <div className="relative h-[300px] sm:h-[500px] w-full">
                <Image
                  src="https://images.unsplash.com/photo-1541961017774-22349e4a1262?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                  alt="Abstract artwork series"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        {/* Divider */}
        <div className="h-[1px] bg-gray-200"></div>

        {/* Best Sellers - Carousel */}
        <section className="py-16 bg-white">
          <div className="mx-auto max-w-[600px] text-center">
            <h2 className="text-4xl sm:text-5xl font-semibold tracking-tight text-[#1d1d1f]">Best Sellers</h2>
            <p className="mt-2 text-lg sm:text-xl text-[#1d1d1f]">Our most popular pieces.</p>
          </div>

          <div className="mt-12 relative">
            <div className="mx-auto max-w-[1200px] px-4">
              <div className="flex space-x-6 overflow-x-auto pb-8 scrollbar-hide">
                {featuredArtworks.map((artwork) => (
                  <ProductCard key={artwork.id} product={artwork} />
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
