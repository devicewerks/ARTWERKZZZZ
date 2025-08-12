"use client"

import React from "react"

import { Suspense, useRef, useState, useMemo } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { OrbitControls, Text, Html, Environment, Preload } from "@react-three/drei"
import { Physics, RigidBody } from "@react-three/rapier"
import { formatPrice } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { MetaverseControls } from "./metaverse-controls"
import { useFirstPersonControls } from "@/hooks/use-controls"
import * as THREE from "three"

const textureCache = new Map()

function useOptimizedTexture(url: string) {
  return useMemo(() => {
    if (textureCache.has(url)) {
      return textureCache.get(url)
    }

    const loader = new THREE.TextureLoader()
    const texture = loader.load(url)

    // Optimize texture settings for performance
    texture.generateMipmaps = true
    texture.minFilter = THREE.LinearMipmapLinearFilter
    texture.magFilter = THREE.LinearFilter
    texture.format = THREE.RGBFormat
    texture.flipY = false

    textureCache.set(url, texture)
    return texture
  }, [url])
}

const ArtworkFrame = React.memo(({ artwork, onAddToCart, distance }) => {
  const [hovered, setHovered] = useState(false)
  const [showDetails, setShowDetails] = useState(false)
  const frameRef = useRef()
  const groupRef = useRef()

  const artworkTexture = useOptimizedTexture(artwork.image)
  const normalTexture = useOptimizedTexture("/textures/canvas-normal.jpg")

  const isNearby = distance < 10
  const geometryDetail = isNearby ? [64, 64] : [32, 32]

  const frameMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#1a1a1a",
        metalness: 0.8,
        roughness: 0.2,
        envMapIntensity: 1.0,
      }),
    [],
  )

  const artworkMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        map: artworkTexture,
        normalMap: normalTexture,
        roughness: 0.7,
        metalness: 0.1,
      }),
    [artworkTexture, normalTexture],
  )

  useFrame((state, delta) => {
    if (frameRef.current) {
      const targetScale = hovered ? 1.05 : 1.0
      frameRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), delta * 8)
    }
  })

  if (distance > 25) return null

  return (
    <group ref={groupRef} position={artwork.position} rotation={artwork.rotation}>
      <mesh
        ref={frameRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={() => setShowDetails(!showDetails)}
        scale={artwork.scale}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[1, 1, 0.1]} />
        <primitive object={frameMaterial} attach="material" />

        <mesh position={[0, 0, 0.06]} castShadow>
          <planeGeometry args={[0.9, 0.9, ...geometryDetail]} />
          <primitive object={artworkMaterial} attach="material" />
        </mesh>

        <Text
          position={[0, -0.6, 0.06]}
          fontSize={0.08}
          color="#ffffff"
          anchorX="center"
          anchorY="top"
          font="/fonts/Geist-Bold.ttf"
        >
          {artwork.name}
        </Text>
      </mesh>

      {showDetails && isNearby && (
        <Html position={[0, 0, 0.5]} distanceFactor={10} transform>
          <div className="bg-black/80 backdrop-blur-xl border border-white/20 p-6 rounded-2xl shadow-2xl w-72">
            <h3 className="text-xl font-bold text-white">{artwork.name}</h3>
            <p className="text-white/70 text-sm">By {artwork.artist}</p>
            <p className="text-white/60 text-sm">{artwork.type}</p>
            <p className="text-2xl font-semibold mt-3 text-white">{formatPrice(artwork.price)}</p>
            <div className="mt-6 flex justify-between gap-3">
              <Button
                size="sm"
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-xl flex-1"
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
                className="border-white/30 text-white hover:bg-white/10 rounded-xl bg-transparent"
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
})

function Floor() {
  const floorTexture = useOptimizedTexture("/textures/marble-floor.jpg")
  const floorNormal = useOptimizedTexture("/textures/marble-normal.jpg")
  const floorRoughness = useOptimizedTexture("/textures/marble-roughness.jpg")

  const floorMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        map: floorTexture,
        normalMap: floorNormal,
        roughnessMap: floorRoughness,
        metalness: 0.1,
        roughness: 0.3,
        envMapIntensity: 0.5,
      }),
    [floorTexture, floorNormal, floorRoughness],
  )

  return (
    <RigidBody type="fixed" colliders="cuboid">
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[100, 100]} />
        <primitive object={floorMaterial} attach="material" />
      </mesh>
    </RigidBody>
  )
}

function GalleryWalls() {
  const wallTexture = useOptimizedTexture("/textures/concrete-wall.jpg")
  const wallNormal = useOptimizedTexture("/textures/concrete-normal.jpg")

  const wallMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        map: wallTexture,
        normalMap: wallNormal,
        roughness: 0.8,
        metalness: 0.0,
        color: "#2a2a2a",
      }),
    [wallTexture, wallNormal],
  )

  return (
    <group>
      <mesh position={[0, 2.5, -12]} receiveShadow castShadow>
        <boxGeometry args={[24, 5, 0.2]} />
        <primitive object={wallMaterial} attach="material" />
      </mesh>

      <mesh position={[-12, 2.5, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow castShadow>
        <boxGeometry args={[24, 5, 0.2]} />
        <primitive object={wallMaterial} attach="material" />
      </mesh>

      <mesh position={[12, 2.5, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow castShadow>
        <boxGeometry args={[24, 5, 0.2]} />
        <primitive object={wallMaterial} attach="material" />
      </mesh>

      <mesh position={[0, 5, 0]} rotation={[Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[24, 24]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.9} />
      </mesh>
    </group>
  )
}

const Sculpture = React.memo(({ position }) => {
  const sculptureRef = useRef()

  const sculptureMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#c0c0c0",
        metalness: 0.9,
        roughness: 0.1,
        envMapIntensity: 1.5,
      }),
    [],
  )

  useFrame((state) => {
    if (sculptureRef.current) {
      sculptureRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1
    }
  })

  return (
    <group position={position}>
      <mesh ref={sculptureRef} position={[0, 1, 0]} castShadow receiveShadow>
        <sphereGeometry args={[0.5, 64, 64]} />
        <primitive object={sculptureMaterial} attach="material" />
      </mesh>
      <mesh position={[0, 0.25, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.2, 0.4, 0.5, 32]} />
        <meshStandardMaterial color="#333" metalness={0.5} roughness={0.5} />
      </mesh>
    </group>
  )
})

function EnhancedLighting() {
  return (
    <>
      <directionalLight
        position={[10, 15, 10]}
        intensity={1.2}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={50}
        shadow-camera-left={-20}
        shadow-camera-right={20}
        shadow-camera-top={20}
        shadow-camera-bottom={-20}
        shadow-bias={-0.0001}
      />

      <ambientLight intensity={0.3} color="#404040" />

      <pointLight position={[-5, 3, -5]} intensity={0.8} color="#4080ff" distance={15} />
      <pointLight position={[5, 3, 5]} intensity={0.8} color="#ff8040" distance={15} />
      <pointLight position={[0, 4, 0]} intensity={1.0} color="#ffffff" distance={20} />

      <spotLight
        position={[0, 8, 0]}
        angle={Math.PI / 6}
        penumbra={0.5}
        intensity={1.5}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
    </>
  )
}

function PlayerControls({ enableFirstPerson = false }) {
  const { camera } = useThree()
  const controlsRef = useRef()
  const { isLocked } = useFirstPersonControls(8, 0.002)

  useFrame(() => {
    if (controlsRef.current && !isLocked) {
      controlsRef.current.update()
    }
  })

  if (enableFirstPerson) {
    return null // First-person controls are handled by the hook
  }

  return (
    <OrbitControls
      ref={controlsRef}
      camera={camera}
      makeDefault
      minDistance={2}
      maxDistance={20}
      minPolarAngle={0}
      maxPolarAngle={Math.PI / 2}
      enableDamping
      dampingFactor={0.05}
      rotateSpeed={0.5}
      panSpeed={0.8}
      zoomSpeed={1.0}
    />
  )
}

export function MetaverseExperience({ artworks, onAddToCart }) {
  const [enableFirstPerson, setEnableFirstPerson] = useState(false)
  const [cameraPosition, setCameraPosition] = useState([0, 1.8, 8])

  const optimizedArtworks = useMemo(() => {
    return artworks.map((artwork) => ({
      ...artwork,
      distance: Math.sqrt(artwork.position[0] ** 2 + artwork.position[1] ** 2 + artwork.position[2] ** 2),
    }))
  }, [artworks])

  const handleModeChange = (mode) => {
    setEnableFirstPerson(mode === "firstperson")
  }

  return (
    <div className="h-screen w-full relative">
      <MetaverseControls onModeChange={handleModeChange} currentMode={enableFirstPerson ? "firstperson" : "orbit"} />

      <Canvas
        shadows="soft"
        camera={{
          position: cameraPosition,
          fov: 75,
          near: 0.1,
          far: 100,
        }}
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: "high-performance",
          stencil: false,
          depth: true,
        }}
      >
        <Suspense fallback={null}>
          <fog attach="fog" args={["#0a0a0a", 5, 40]} />

          <EnhancedLighting />

          <Physics gravity={[0, -9.81, 0]}>
            <Floor />
            <GalleryWalls />

            {optimizedArtworks.map((artwork) => (
              <ArtworkFrame key={artwork.id} artwork={artwork} onAddToCart={onAddToCart} distance={artwork.distance} />
            ))}

            <Sculpture position={[0, 0, 0]} />
            <Sculpture position={[-6, 0, 6]} />
            <Sculpture position={[6, 0, -6]} />
            <Sculpture position={[-8, 0, -8]} />
            <Sculpture position={[8, 0, 8]} />
          </Physics>

          <Environment preset="city" background={false} environmentIntensity={0.4} />

          <PlayerControls enableFirstPerson={enableFirstPerson} />

          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  )
}
