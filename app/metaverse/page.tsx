"use client"

import { useState, useEffect } from "react"
import { SiteHeader } from "@/components/layout/site-header"
import { SiteFooter } from "@/components/layout/site-footer"
import { Button } from "@/components/ui/button"
import { MetaverseExperience } from "@/components/metaverse/metaverse-experience"
import { MetaverseControls } from "@/components/metaverse/metaverse-controls"
import { MetaverseLoading } from "@/components/metaverse/metaverse-loading"
import { MetaverseInfo } from "@/components/metaverse/metaverse-info"
import { VRButton } from "@/components/metaverse/vr-button"
import { useCart } from "@/components/cart/cart-provider"

export default function MetaversePage() {
  const [isLoading, setIsLoading] = useState(true)
  const [isVRSupported, setIsVRSupported] = useState(false)
  const [showInfo, setShowInfo] = useState(true)
  const { addItem } = useCart()

  // Check if WebXR is supported
  useEffect(() => {
    if (typeof navigator !== "undefined" && "xr" in navigator) {
      // @ts-ignore - navigator.xr is not in the TypeScript types yet
      navigator.xr
        ?.isSessionSupported("immersive-vr")
        .then((supported) => {
          setIsVRSupported(supported)
        })
        .catch(() => {
          setIsVRSupported(false)
        })
    }

    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  // Mock artwork data for the metaverse gallery with local placeholder images
  const galleryArtworks = [
    {
      id: "1",
      name: "Summer Breeze",
      artist: "Jane Smith",
      type: "Abstract Painting",
      price: 1299,
      image: "/placeholder.svg?height=800&width=800&text=Summer+Breeze",
      position: [0, 1.5, -5],
      rotation: [0, 0, 0],
      scale: [2, 2, 0.1],
    },
    {
      id: "2",
      name: "Urban Rhythm",
      artist: "Michael Chen",
      type: "Abstract Painting",
      price: 1499,
      image: "/placeholder.svg?height=800&width=800&text=Urban+Rhythm",
      position: [-5, 1.5, 0],
      rotation: [0, Math.PI / 2, 0],
      scale: [2, 2, 0.1],
    },
    {
      id: "3",
      name: "Coastal Dreams",
      artist: "Sarah Johnson",
      type: "Landscape Painting",
      price: 1899,
      image: "/placeholder.svg?height=800&width=800&text=Coastal+Dreams",
      position: [5, 1.5, 0],
      rotation: [0, -Math.PI / 2, 0],
      scale: [2, 2, 0.1],
    },
    {
      id: "4",
      name: "Abstract Flow",
      artist: "David Williams",
      type: "Abstract Painting",
      price: 1699,
      image: "/placeholder.svg?height=800&width=800&text=Abstract+Flow",
      position: [0, 1.5, 5],
      rotation: [0, Math.PI, 0],
      scale: [2, 2, 0.1],
    },
    {
      id: "5",
      name: "Midnight Bloom",
      artist: "Emma Davis",
      type: "Abstract Painting",
      price: 1999,
      image: "/placeholder.svg?height=800&width=800&text=Midnight+Bloom",
      position: [-3, 1.5, -5],
      rotation: [0, 0, 0],
      scale: [2, 2, 0.1],
    },
    {
      id: "6",
      name: "Serene Landscape",
      artist: "Thomas Anderson",
      type: "Landscape Painting",
      price: 2199,
      image: "/placeholder.svg?height=800&width=800&text=Serene+Landscape",
      position: [3, 1.5, -5],
      rotation: [0, 0, 0],
      scale: [2, 2, 0.1],
    },
  ]

  const handleAddToCart = (artwork) => {
    addItem({
      id: artwork.id,
      name: artwork.name,
      artist: artwork.artist,
      type: artwork.type,
      price: artwork.price,
      image: artwork.image,
    })
  }

  return (
    <div className="flex min-h-screen flex-col bg-black">
      <SiteHeader />

      <main className="flex-1 relative">
        {isLoading ? (
          <MetaverseLoading />
        ) : (
          <>
            <MetaverseExperience artworks={galleryArtworks} onAddToCart={handleAddToCart} />
            <MetaverseControls />
            {showInfo && <MetaverseInfo onClose={() => setShowInfo(false)} />}
            {isVRSupported && <VRButton />}
          </>
        )}
      </main>

      <div className="bg-black py-8 text-center">
        <h2 className="text-2xl font-semibold text-white mb-4">Experience Art in the Metaverse</h2>
        <p className="text-gray-300 max-w-2xl mx-auto px-4">
          Navigate through our virtual gallery using your keyboard and mouse. Click on artworks to view details and add
          them to your cart. For the full experience, use a VR headset.
        </p>
        <div className="mt-6 flex justify-center gap-4">
          <Button className="rounded-full bg-[#0071e3] hover:bg-[#0077ED]" onClick={() => setShowInfo(true)}>
            How to Navigate
          </Button>
          <Button variant="outline" className="rounded-full text-white border-white hover:bg-white/10">
            Return to 2D Site
          </Button>
        </div>
      </div>

      <SiteFooter />
    </div>
  )
}
