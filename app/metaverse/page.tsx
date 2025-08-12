"use client"

import { Button } from "@/components/ui/button"
import { useState, useEffect, useRef } from "react"
import { Canvas } from "@react-three/fiber"
import { Physics } from "@react-three/rapier"
import { OrbitControls, PerspectiveCamera } from "@react-three/drei"
import { SiteHeader } from "@/components/layout/site-header"
import { SiteFooter } from "@/components/layout/site-footer"
import { MetaverseLoading } from "@/components/metaverse/metaverse-loading"
import { MetaverseInfo } from "@/components/metaverse/metaverse-info"
import { MetaverseControls } from "@/components/metaverse/metaverse-controls"
import { VRButton } from "@/components/metaverse/vr-button"
import { useCart } from "@/components/cart/cart-provider"
import { SkyScene } from "@/components/metaverse/environment/sky-scene"
import { OceanFloor } from "@/components/metaverse/environment/ocean-floor"
import { FloatingCitadel } from "@/components/metaverse/environment/floating-citadel"
import { ReactiveArtwork } from "@/components/metaverse/artwork/reactive-artwork"
import { AiDocent } from "@/components/metaverse/guides/ai-docent"
import { UserAvatar } from "@/components/metaverse/interactive/avatar"
// import { MetaverseUI } from "@/components/metaverse/ui/metaverse-ui"

export default function MetaversePage() {
  const [isLoading, setIsLoading] = useState(true)
  const [isVRSupported, setIsVRSupported] = useState(false)
  const [showInfo, setShowInfo] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const cameraRef = useRef()

  // Use cart hook
  const cart = useCart()

  useEffect(() => {
    setIsMounted(true)

    // Check if WebXR is supported
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

  // Gallery artworks with enhanced descriptions and positions for the floating citadel
  const galleryArtworks = [
    {
      id: "1",
      name: "Ethereal Resonance",
      artist: "Aria Luminova",
      type: "Digital Holography",
      price: 2899,
      image: "/placeholder.svg?height=800&width=800&text=Ethereal+Resonance",
      position: [-8, 3, -15],
      rotation: [0, 0, 0],
      scale: [2.5, 2.5, 0.1],
      description:
        "A mesmerizing exploration of light and consciousness, where digital particles form patterns that respond to the viewer's presence.",
      medium: "Holographic projection on quantum glass",
      dimensions: "40 × 40 inches",
      year: "2025",
    },
    {
      id: "2",
      name: "Quantum Memories",
      artist: "Nexus Chen",
      type: "Neural Art",
      price: 3499,
      image: "/placeholder.svg?height=800&width=800&text=Quantum+Memories",
      position: [-18, 4, -5],
      rotation: [0, Math.PI / 2, 0],
      scale: [2.5, 2.5, 0.1],
      description:
        "Created through a neural interface that translates brainwaves into visual patterns, capturing the artist's memories in abstract form.",
      medium: "AI-generated pigments on synthetic canvas",
      dimensions: "60 × 48 inches",
      year: "2024",
    },
    {
      id: "3",
      name: "Oceanic Consciousness",
      artist: "Marina Abyssal",
      type: "Bioluminescent Sculpture",
      price: 4899,
      image: "/placeholder.svg?height=800&width=800&text=Oceanic+Consciousness",
      position: [18, 5, -8],
      rotation: [0, -Math.PI / 2, 0],
      scale: [2.5, 2.5, 0.1],
      description:
        "Inspired by deep-sea creatures, this piece uses genetically modified bioluminescent compounds that respond to sound vibrations.",
      medium: "Synthetic bioluminescence in quantum suspension",
      dimensions: "Variable dimensions",
      year: "2025",
    },
    {
      id: "4",
      name: "Chronos Fragments",
      artist: "Tempus Wright",
      type: "Temporal Photography",
      price: 3699,
      image: "/placeholder.svg?height=800&width=800&text=Chronos+Fragments",
      position: [0, 7, -25],
      rotation: [0, 0, 0],
      scale: [3, 3, 0.1],
      description:
        "Using experimental quantum photography techniques, this artwork captures multiple moments in time simultaneously, creating a layered temporal experience.",
      medium: "Quantum-entangled photographic process",
      dimensions: "36 × 48 inches",
      year: "2024",
    },
    {
      id: "5",
      name: "Neuromorphic Dreams",
      artist: "Synaptica Nova",
      type: "Cognitive Sculpture",
      price: 5999,
      image: "/placeholder.svg?height=800&width=800&text=Neuromorphic+Dreams",
      position: [-12, 3, -8],
      rotation: [0, Math.PI / 6, 0],
      scale: [2.5, 2.5, 0.1],
      description:
        "A sculptural representation of human consciousness, with intricate patterns that mimic neural pathways and synaptic connections.",
      medium: "Nano-carbon fibers with embedded quantum dots",
      dimensions: "30 × 30 × 30 inches",
      year: "2025",
    },
    {
      id: "6",
      name: "Harmonic Convergence",
      artist: "Echo Resonant",
      type: "Sonic Visualization",
      price: 4199,
      image: "/placeholder.svg?height=800&width=800&text=Harmonic+Convergence",
      position: [15, 4, -5],
      rotation: [0, -Math.PI / 5, 0],
      scale: [2.5, 2.5, 0.1],
      description:
        "This piece translates musical compositions into visual patterns, creating a synesthetic experience that bridges auditory and visual perception.",
      medium: "Frequency-responsive chromatic polymers",
      dimensions: "48 × 36 inches",
      year: "2024",
    },
    {
      id: "7",
      name: "Astral Projection",
      artist: "Celeste Voyager",
      type: "Cosmic Photography",
      price: 3899,
      image: "/placeholder.svg?height=800&width=800&text=Astral+Projection",
      position: [-8, 2.5, 12],
      rotation: [0, Math.PI / 3, 0],
      scale: [2.5, 2.5, 0.1],
      description:
        "Captured using advanced telescopic technology, this piece reveals distant cosmic phenomena in unprecedented detail, blending science and art.",
      medium: "Quantum-enhanced photographic print on metallic substrate",
      dimensions: "60 × 40 inches",
      year: "2025",
    },
    {
      id: "8",
      name: "Synthetic Genesis",
      artist: "Vita Artificium",
      type: "Biodigital Art",
      price: 6299,
      image: "/placeholder.svg?height=800&width=800&text=Synthetic+Genesis",
      position: [12, 3.5, 10],
      rotation: [0, -Math.PI / 4, 0],
      scale: [2.5, 2.5, 0.1],
      description:
        "A groundbreaking fusion of synthetic biology and digital art, creating living patterns that evolve and respond to environmental conditions.",
      medium: "Programmable microorganisms on nutrient substrate",
      dimensions: "24 × 24 inches",
      year: "2025",
    },
  ]

  const handleAddToCart = (artwork) => {
    if (isMounted) {
      cart.addItem({
        id: artwork.id,
        name: artwork.name,
        artist: artwork.artist,
        type: artwork.type,
        price: artwork.price,
        image: artwork.image,
      })
    }
  }

  // Show loading until mounted
  if (!isMounted) {
    return (
      <div className="flex min-h-screen flex-col bg-black">
        <div className="flex-1 flex items-center justify-center">
          <div className="text-white">Loading...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col bg-black">
      <SiteHeader />

      <main className="flex-1 relative">
        {isLoading ? (
          <MetaverseLoading />
        ) : (
          <>
            <div className="h-screen w-full">
              <Canvas shadows>
                <PerspectiveCamera ref={cameraRef} makeDefault position={[0, 2.5, 12]} fov={85} />

                {/* Environment */}
                <SkyScene />
                <OceanFloor />

                <Physics>
                  {/* Main floating citadel structure */}
                  <FloatingCitadel />

                  {/* Reactive artworks */}
                  {galleryArtworks.map((artwork) => (
                    <ReactiveArtwork key={artwork.id} artwork={artwork} onAddToCart={handleAddToCart} />
                  ))}

                  {/* AI Docent guide */}
                  <AiDocent target={cameraRef.current} artworks={galleryArtworks} />

                  {/* User avatar and trail */}
                  <UserAvatar />
                </Physics>

                <OrbitControls
                  enableZoom={true}
                  enablePan={true}
                  minDistance={3}
                  maxDistance={80}
                  maxPolarAngle={Math.PI / 1.8}
                  minPolarAngle={Math.PI / 6}
                  panSpeed={0.8}
                  rotateSpeed={0.5}
                />

                {/* <MetaverseUI /> */}
              </Canvas>
            </div>

            <MetaverseControls />
            {showInfo && (
              <MetaverseInfo
                onClose={() => {
                  console.log("Closing modal") // Debug log
                  setShowInfo(false)
                }}
              />
            )}
            {isVRSupported && <VRButton />}
          </>
        )}
      </main>

      <div className="bg-black py-8 text-center">
        <h2 className="text-2xl font-semibold text-white mb-4">Experience Art in the Metaverse</h2>
        <p className="text-gray-300 max-w-2xl mx-auto px-4">
          Navigate through our floating citadel gallery using your keyboard and mouse. Interact with artworks to view
          details and add them to your cart. For the full experience, use a VR headset.
        </p>
        <div className="mt-6 flex justify-center gap-4">
          <Button
            className="rounded-full bg-[#a78fff] hover:bg-[#8a66ff]"
            onClick={() => {
              console.log("Opening modal") // Debug log
              setShowInfo(true)
            }}
          >
            How to Navigate
          </Button>
          <Button variant="outline" className="rounded-full text-white border-white hover:bg-white/10 bg-transparent">
            Return to 2D Site
          </Button>
        </div>
      </div>

      <SiteFooter />
    </div>
  )
}
