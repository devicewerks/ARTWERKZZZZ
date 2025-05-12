"use client"

import { Suspense, useRef, useState, useEffect } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { OrbitControls, Text, Html, Environment } from "@react-three/drei"
import { Physics, RigidBody } from "@react-three/rapier"
import { formatPrice } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import * as THREE from "three"

// Artwork frame component
function ArtworkFrame({ artwork, onAddToCart }) {
  const [hovered, setHovered] = useState(false)
  const [showDetails, setShowDetails] = useState(false)
  const [textureLoaded, setTextureLoaded] = useState(false)
  const [textureError, setTextureError] = useState(false)
  const frameRef = useRef()
  const materialRef = useRef(new THREE.MeshBasicMaterial({ color: "#cccccc" }))

  // Load texture with error handling
  useEffect(() => {
    const textureLoader = new THREE.TextureLoader()

    // Use a placeholder if the image fails to load
    textureLoader.load(
      artwork.image,
      (texture) => {
        materialRef.current.map = texture
        materialRef.current.needsUpdate = true
        setTextureLoaded(true)
      },
      undefined,
      (error) => {
        console.error("Error loading texture:", error)
        setTextureError(true)

        // Load a placeholder instead
        textureLoader.load("/placeholder.svg?height=800&width=800", (placeholderTexture) => {
          materialRef.current.map = placeholderTexture
          materialRef.current.needsUpdate = true
          setTextureLoaded(true)
        })
      },
    )

    return () => {
      if (materialRef.current.map) {
        materialRef.current.map.dispose()
      }
    }
  }, [artwork.image])

  // Hover effect
  useFrame(() => {
    if (frameRef.current) {
      frameRef.current.scale.x = hovered ? artwork.scale[0] * 1.05 : artwork.scale[0]
      frameRef.current.scale.y = hovered ? artwork.scale[1] * 1.05 : artwork.scale[1]
    }
  })

  return (
    <group position={artwork.position} rotation={artwork.rotation}>
      {/* Frame */}
      <mesh
        ref={frameRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={() => setShowDetails(!showDetails)}
        scale={artwork.scale}
      >
        <boxGeometry args={[1, 1, 0.1]} />
        <meshStandardMaterial color="#222" />

        {/* Artwork */}
        <mesh position={[0, 0, 0.06]}>
          <planeGeometry args={[0.9, 0.9]} />
          <primitive object={materialRef.current} attach="material" />

          {/* Loading indicator */}
          {!textureLoaded && (
            <Html center position={[0, 0, 0.01]}>
              <div className="bg-black/50 text-white px-2 py-1 rounded text-xs">Loading...</div>
            </Html>
          )}

          {/* Error indicator */}
          {textureError && textureLoaded && (
            <Html center position={[0, 0, 0.01]}>
              <div className="bg-black/50 text-white px-2 py-1 rounded text-xs">{artwork.name}</div>
            </Html>
          )}
        </mesh>

        {/* Artwork label */}
        <Text position={[0, -0.6, 0.06]} fontSize={0.08} color="white" anchorX="center" anchorY="top">
          {artwork.name}
        </Text>
      </mesh>

      {/* Artwork details popup */}
      {showDetails && (
        <Html position={[0, 0, 0.5]} distanceFactor={10} transform>
          <div className="bg-white/90 backdrop-blur-md p-4 rounded-lg shadow-lg w-64">
            <h3 className="text-lg font-bold">{artwork.name}</h3>
            <p className="text-sm">By {artwork.artist}</p>
            <p className="text-sm">{artwork.type}</p>
            <p className="text-lg font-semibold mt-2">{formatPrice(artwork.price)}</p>
            <div className="mt-4 flex justify-between">
              <Button
                size="sm"
                className="bg-[#0071e3] hover:bg-[#0077ED] text-white rounded-full"
                onClick={(e) => {
                  e.stopPropagation()
                  onAddToCart(artwork)
                }}
              >
                Add to Bag
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="rounded-full"
                onClick={(e) => {
                  e.stopPropagation()
                  setShowDetails(false)
                }}
              >
                Close
              </Button>
            </div>
          </div>
        </Html>
      )}
    </group>
  )
}

// Floor component
function Floor() {
  return (
    <RigidBody type="fixed" colliders="cuboid">
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[50, 50]} />
        <meshStandardMaterial color="#333" />
      </mesh>
    </RigidBody>
  )
}

// Gallery walls
function GalleryWalls() {
  return (
    <group>
      {/* Back wall */}
      <mesh position={[0, 2.5, -6]} receiveShadow castShadow>
        <boxGeometry args={[12, 5, 0.2]} />
        <meshStandardMaterial color="#555" />
      </mesh>

      {/* Left wall */}
      <mesh position={[-6, 2.5, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow castShadow>
        <boxGeometry args={[12, 5, 0.2]} />
        <meshStandardMaterial color="#555" />
      </mesh>

      {/* Right wall */}
      <mesh position={[6, 2.5, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow castShadow>
        <boxGeometry args={[12, 5, 0.2]} />
        <meshStandardMaterial color="#555" />
      </mesh>

      {/* Front wall with entrance */}
      <mesh position={[-3, 2.5, 6]} receiveShadow castShadow>
        <boxGeometry args={[6, 5, 0.2]} />
        <meshStandardMaterial color="#555" />
      </mesh>

      <mesh position={[3, 2.5, 6]} receiveShadow castShadow>
        <boxGeometry args={[6, 5, 0.2]} />
        <meshStandardMaterial color="#555" />
      </mesh>

      {/* Ceiling */}
      <mesh position={[0, 5, 0]} rotation={[Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[12, 12]} />
        <meshStandardMaterial color="#444" />
      </mesh>
    </group>
  )
}

// Simple sculpture component instead of loading GLB
function Sculpture({ position }) {
  return (
    <group position={position}>
      <mesh position={[0, 1, 0]}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial color="#888" metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[0, 0.25, 0]}>
        <cylinderGeometry args={[0.2, 0.4, 0.5, 32]} />
        <meshStandardMaterial color="#555" />
      </mesh>
    </group>
  )
}

// Player camera controls
function PlayerControls() {
  const { camera } = useThree()
  const controlsRef = useRef()

  useFrame(() => {
    if (controlsRef.current) {
      controlsRef.current.update()
    }
  })

  return (
    <OrbitControls
      ref={controlsRef}
      camera={camera}
      makeDefault
      minDistance={1}
      maxDistance={10}
      minPolarAngle={0}
      maxPolarAngle={Math.PI / 2}
    />
  )
}

// Main metaverse experience component
export function MetaverseExperience({ artworks, onAddToCart }) {
  return (
    <div className="h-screen w-full">
      <Canvas shadows camera={{ position: [0, 1.6, 0], fov: 60 }}>
        <Suspense fallback={null}>
          <fog attach="fog" args={["#000", 1, 25]} />
          <ambientLight intensity={0.5} />
          <directionalLight
            position={[5, 10, 5]}
            intensity={1}
            castShadow
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
          />

          <Physics>
            <Floor />
            <GalleryWalls />

            {/* Render all artworks */}
            {artworks.map((artwork) => (
              <ArtworkFrame key={artwork.id} artwork={artwork} onAddToCart={onAddToCart} />
            ))}

            {/* Add some sculptures */}
            <Sculpture position={[0, 0, 0]} />
            <Sculpture position={[-3, 0, 3]} />
            <Sculpture position={[3, 0, -3]} />
          </Physics>

          <Environment preset="city" />
          <PlayerControls />
        </Suspense>
      </Canvas>
    </div>
  )
}
