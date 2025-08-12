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
      const targetScale = hovered ? 1.15 : 1
      meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.12)

      // Gentle floating animation
      meshRef.current.position.y = artwork.position[1] + Math.sin(state.clock.elapsedTime + artwork.position[0]) * 0.15

      if (hovered) {
        meshRef.current.rotation.y += 0.015
        meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 2) * 0.02
      }
    }
  })

  return (
    <group position={artwork.position} rotation={artwork.rotation}>
      <mesh
        ref={meshRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={() => setClicked(!clicked)}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[artwork.scale[0], artwork.scale[1], 0.15]} />
        <meshStandardMaterial
          color={hovered ? "#1a1a2e" : "#16213e"}
          metalness={0.9}
          roughness={0.1}
          emissive={hovered ? "#0f3460" : "#000000"}
          emissiveIntensity={hovered ? 0.3 : 0}
        />
      </mesh>

      <mesh position={[0, 0, 0.08]}>
        <boxGeometry args={[artwork.scale[0] + 0.1, artwork.scale[1] + 0.1, 0.02]} />
        <meshStandardMaterial
          color="#00ffff"
          emissive="#00ffff"
          emissiveIntensity={hovered ? 0.8 : 0.4}
          metalness={1}
          roughness={0}
          transparent
          opacity={0.6}
        />
      </mesh>

      {/* Artwork surface */}
      <mesh position={[0, 0, 0.09]}>
        <planeGeometry args={[artwork.scale[0] * 0.85, artwork.scale[1] * 0.85]} />
        <meshStandardMaterial
          color="#ffffff"
          metalness={0.1}
          roughness={0.2}
          map={null} // In a real app, you'd load the texture here
        />
      </mesh>

      <Text
        position={[0, -artwork.scale[1] / 2 - 0.4, 0.1]}
        fontSize={0.18}
        color="#00ffff"
        anchorX="center"
        anchorY="top"
        maxWidth={artwork.scale[0]}
        font="/fonts/Geist-Bold.ttf"
      >
        {artwork.name}
      </Text>

      {/* Artist name */}
      <Text
        position={[0, -artwork.scale[1] / 2 - 0.65, 0.1]}
        fontSize={0.12}
        color="#ffffff"
        anchorX="center"
        anchorY="top"
        maxWidth={artwork.scale[0]}
        font="/fonts/Geist-Regular.ttf"
      >
        by {artwork.artist}
      </Text>

      {/* Interactive info panel */}
      {clicked && (
        <Html position={[0, 0, 1.5]} transform occlude>
          <div className="bg-black/90 backdrop-blur-md p-6 rounded-xl shadow-2xl w-80 border border-cyan-500/30">
            <h3 className="font-bold text-xl mb-2 text-cyan-400">{artwork.name}</h3>
            <p className="text-sm text-gray-300 mb-1">by {artwork.artist}</p>
            <p className="text-sm text-gray-400 mb-4">{artwork.type}</p>
            <p className="text-2xl font-semibold mb-4 text-white">{formatPrice(artwork.price)}</p>
            <p className="text-sm mb-6 text-gray-200 leading-relaxed">{artwork.description}</p>
            <div className="flex gap-3">
              <Button
                size="sm"
                className="bg-cyan-500 hover:bg-cyan-400 text-black rounded-full flex-1 font-semibold"
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
                className="rounded-full border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10 bg-transparent"
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

      {hovered && (
        <group>
          <pointLight position={[0, 0, 0.8]} intensity={0.8} color="#00ffff" distance={4} />
          <pointLight position={[0, 0, -0.3]} intensity={0.4} color="#ff00ff" distance={3} />
          <pointLight
            position={[artwork.scale[0] / 2, artwork.scale[1] / 2, 0.5]}
            intensity={0.3}
            color="#ffff00"
            distance={2}
          />
        </group>
      )}
    </group>
  )
}
