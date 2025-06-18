"use client"

import { useRef, useState } from "react"
import { useFrame } from "@react-three/fiber"
import { Html, Text } from "@react-three/drei"
import { Button } from "@/components/ui/button"
import { formatPrice } from "@/lib/utils"
import * as THREE from "three"

interface ReactiveArtworkProps {
  artwork: {
    id: string
    name: string
    artist: string
    type: string
    price: number
    image: string
    position: [number, number, number]
    rotation: [number, number, number]
    scale: [number, number, number]
    description: string
  }
  onAddToCart: (artwork: any) => void
}

export function ReactiveArtwork({ artwork, onAddToCart }: ReactiveArtworkProps) {
  const meshRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)
  const [clicked, setClicked] = useState(false)

  useFrame((state) => {
    if (meshRef.current) {
      // Hover animation
      const targetScale = hovered ? 1.1 : 1
      meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1)

      // Gentle floating animation
      meshRef.current.position.y = artwork.position[1] + Math.sin(state.clock.elapsedTime + artwork.position[0]) * 0.1

      // Subtle rotation when hovered
      if (hovered) {
        meshRef.current.rotation.y += 0.01
      }
    }
  })

  return (
    <group position={artwork.position} rotation={artwork.rotation}>
      {/* Artwork frame */}
      <mesh
        ref={meshRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={() => setClicked(!clicked)}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[artwork.scale[0], artwork.scale[1], 0.1]} />
        <meshStandardMaterial color={hovered ? "#333" : "#222"} metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Artwork surface */}
      <mesh position={[0, 0, 0.06]}>
        <planeGeometry args={[artwork.scale[0] * 0.9, artwork.scale[1] * 0.9]} />
        <meshStandardMaterial
          color="#ffffff"
          map={null} // In a real app, you'd load the texture here
        />
      </mesh>

      {/* Artwork title */}
      <Text
        position={[0, -artwork.scale[1] / 2 - 0.3, 0.1]}
        fontSize={0.15}
        color="white"
        anchorX="center"
        anchorY="top"
        maxWidth={artwork.scale[0]}
      >
        {artwork.name}
      </Text>

      {/* Artist name */}
      <Text
        position={[0, -artwork.scale[1] / 2 - 0.5, 0.1]}
        fontSize={0.1}
        color="#cccccc"
        anchorX="center"
        anchorY="top"
        maxWidth={artwork.scale[0]}
      >
        by {artwork.artist}
      </Text>

      {/* Interactive info panel */}
      {clicked && (
        <Html position={[0, 0, 1]} transform occlude>
          <div className="bg-white/95 backdrop-blur-md p-4 rounded-lg shadow-lg w-64 border">
            <h3 className="font-bold text-lg mb-2">{artwork.name}</h3>
            <p className="text-sm text-gray-600 mb-1">by {artwork.artist}</p>
            <p className="text-sm text-gray-600 mb-3">{artwork.type}</p>
            <p className="text-lg font-semibold mb-3">{formatPrice(artwork.price)}</p>
            <p className="text-sm mb-4">{artwork.description}</p>
            <div className="flex gap-2">
              <Button
                size="sm"
                className="bg-[#0071e3] hover:bg-[#0077ED] text-white rounded-full flex-1"
                onClick={(e) => {
                  e.stopPropagation()
                  onAddToCart(artwork)
                }}
              >
                Add to Cart
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="rounded-full"
                onClick={(e) => {
                  e.stopPropagation()
                  setClicked(false)
                }}
              >
                Close
              </Button>
            </div>
          </div>
        </Html>
      )}

      {/* Glow effect when hovered */}
      {hovered && <pointLight position={[0, 0, 0.5]} intensity={0.5} color="#a78fff" distance={3} />}
    </group>
  )
}
