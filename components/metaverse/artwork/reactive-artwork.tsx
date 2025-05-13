"use client"

import { useRef, useState, useMemo, useEffect } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import { Html, Text } from "@react-three/drei"
import { Vector3 } from "three"
import * as THREE from "three"
import { Button } from "@/components/ui/button"
import { formatPrice } from "@/lib/utils"

// Artwork that reacts to user interactions
export function ReactiveArtwork({ artwork, onAddToCart }) {
  const { camera } = useThree()
  const frameRef = useRef()
  const artworkRef = useRef()
  const [hovered, setHovered] = useState(false)
  const [viewed, setViewed] = useState(false)
  const [showDetails, setShowDetails] = useState(false)
  const [showingInfo, setShowingInfo] = useState(false)
  const materialRef = useRef(
    new THREE.MeshStandardMaterial({
      color: "#ffffff",
      metalness: 0.2,
      roughness: 0.3,
    }),
  )

  // Create a memory trail effect
  const trailRef = useRef()
  const trailPointsRef = useRef([])
  const [trailActive, setTrailActive] = useState(false)

  // Artwork texture loading with error handling
  const textureRef = useRef()
  const [textureLoaded, setTextureLoaded] = useState(false)
  const [textureError, setTextureError] = useState(false)

  // User position for proximity effects
  const [userDistance, setUserDistance] = useState(100)

  // Load texture
  useEffect(() => {
    const textureLoader = new THREE.TextureLoader()

    textureLoader.load(
      artwork.image,
      (texture) => {
        textureRef.current = texture
        materialRef.current.map = texture
        materialRef.current.needsUpdate = true
        setTextureLoaded(true)
      },
      undefined,
      (error) => {
        console.error("Error loading texture:", error)
        setTextureError(true)

        // Load placeholder
        textureLoader.load(
          "/placeholder.svg?height=800&width=800&text=" + encodeURIComponent(artwork.name),
          (placeholderTexture) => {
            textureRef.current = placeholderTexture
            materialRef.current.map = placeholderTexture
            materialRef.current.needsUpdate = true
            setTextureLoaded(true)
          },
        )
      },
    )

    return () => {
      if (textureRef.current) {
        textureRef.current.dispose()
      }
    }
  }, [artwork.image, artwork.name])

  // Update user distance on each frame
  useFrame((state) => {
    if (frameRef.current) {
      const artworkPosition = new Vector3()
      frameRef.current.getWorldPosition(artworkPosition)

      const distance = camera.position.distanceTo(artworkPosition)
      setUserDistance(distance)

      // Scale effect based on hover state
      if (hovered) {
        frameRef.current.scale.x = THREE.MathUtils.lerp(frameRef.current.scale.x, artwork.scale[0] * 1.05, 0.1)
        frameRef.current.scale.y = THREE.MathUtils.lerp(frameRef.current.scale.y, artwork.scale[1] * 1.05, 0.1)
      } else {
        frameRef.current.scale.x = THREE.MathUtils.lerp(frameRef.current.scale.x, artwork.scale[0], 0.1)
        frameRef.current.scale.y = THREE.MathUtils.lerp(frameRef.current.scale.y, artwork.scale[1], 0.1)
      }

      // Subtle breathing animation
      const breathing = Math.sin(state.clock.elapsedTime * 0.5) * 0.003
      frameRef.current.scale.z = artwork.scale[2] * (1 + breathing)

      // If user is close, mark the artwork as viewed
      if (distance < 10 && !viewed) {
        setViewed(true)
      }

      // Handle ambient glow based on distance
      if (artworkRef.current) {
        // Dynamic emissive intensity based on distance
        let emissiveIntensity = 0

        if (distance < 5) {
          emissiveIntensity = 0.2
        } else if (distance < 8) {
          emissiveIntensity = 0.1
        } else if (hovered) {
          emissiveIntensity = 0.3
        }

        // Apply slight rotation when hovering
        if (hovered) {
          artworkRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 2) * 0.02
        } else {
          artworkRef.current.rotation.y = THREE.MathUtils.lerp(artworkRef.current.rotation.y, 0, 0.1)
        }

        // Apply emissive intensity
        materialRef.current.emissiveIntensity = THREE.MathUtils.lerp(
          materialRef.current.emissiveIntensity,
          emissiveIntensity,
          0.1,
        )
      }

      // Update memory trail
      if (trailActive && trailRef.current) {
        // Add new point to trail
        trailPointsRef.current.push({
          position: new Vector3().copy(camera.position),
          life: 1.0,
          color: new THREE.Color(0.6, 0.2, 1.0),
        })

        // Update trail points
        const positions = []
        const colors = []

        trailPointsRef.current = trailPointsRef.current
          .map((point) => {
            point.life -= 0.01
            return point
          })
          .filter((point) => {
            if (point.life > 0) {
              positions.push(point.position.x, point.position.y - 1.5, point.position.z)
              const color = point.color.clone()
              color.multiplyScalar(point.life)
              colors.push(color.r, color.g, color.b)
              return true
            }
            return false
          })

        // Update the trail geometry
        if (trailRef.current.geometry) {
          if (positions.length > 0) {
            trailRef.current.geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3))
            trailRef.current.geometry.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3))
            trailRef.current.geometry.attributes.position.needsUpdate = true
            trailRef.current.geometry.attributes.color.needsUpdate = true
          }
        }
      }
    }
  })

  // Show info when approaching the artwork
  useEffect(() => {
    if (userDistance < 6 && !showingInfo) {
      setShowingInfo(true)
    } else if (userDistance > 8 && showingInfo) {
      setShowingInfo(false)
    }
  }, [userDistance, showingInfo])

  // Create the memory trail points material
  const trailMaterial = useMemo(() => {
    return new THREE.PointsMaterial({
      size: 0.1,
      vertexColors: true,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
    })
  }, [])

  return (
    <group position={artwork.position} rotation={artwork.rotation}>
      {/* Frame */}
      <group
        ref={frameRef}
        scale={artwork.scale}
        onPointerOver={() => {
          setHovered(true)
          setTrailActive(true)
        }}
        onPointerOut={() => {
          setHovered(false)
          setTrailActive(false)
        }}
        onClick={() => {
          setShowDetails(!showDetails)
          // Play a subtle sound effect
          try {
            const audio = new Audio("/sounds/click.mp3")
            audio.volume = 0.2
            audio.play()
          } catch (e) {
            console.error("Audio playback failed:", e)
          }
        }}
      >
        {/* Frame with depth and bevel */}
        <mesh castShadow receiveShadow>
          <boxGeometry args={[1.1, 1.1, 0.1]} />
          <meshStandardMaterial color="#111111" metalness={0.7} roughness={0.2} />
        </mesh>

        {/* Inset */}
        <mesh position={[0, 0, 0.01]} castShadow>
          <boxGeometry args={[1.02, 1.02, 0.03]} />
          <meshStandardMaterial color={viewed ? "#32004d" : "#1a1a1a"} metalness={0.6} roughness={0.3} />
        </mesh>

        {/* Artwork surface */}
        <mesh ref={artworkRef} position={[0, 0, 0.07]} castShadow>
          <planeGeometry args={[0.9, 0.9]} />
          <primitive object={materialRef.current} attach="material" emissive={viewed ? "#a78fff" : "#555555"} />

          {/* Loading indicator */}
          {!textureLoaded && (
            <Html center position={[0, 0, 0.01]}>
              <div className="bg-black/50 text-white px-2 py-1 rounded text-xs">Loading...</div>
            </Html>
          )}
        </mesh>

        {/* Artist signature in corner */}
        <Text
          position={[0.38, -0.38, 0.08]}
          fontSize={0.03}
          color={hovered ? "#ffffff" : "#aaaaaa"}
          anchorX="right"
          anchorY="bottom"
          maxWidth={0.8}
        >
          {artwork.artist}
        </Text>

        {/* Artwork label that appears on hover */}
        {hovered && (
          <group position={[0, -0.6, 0.1]}>
            <Text
              position={[0, 0, 0]}
              fontSize={0.08}
              color="#ffffff"
              anchorX="center"
              anchorY="center"
              maxWidth={0.9}
              outlineWidth={0.005}
              outlineColor="#000000"
            >
              {artwork.name}
            </Text>
          </group>
        )}

        {/* Ambient glow when artwork is being viewed */}
        {viewed && <pointLight position={[0, 0, 0.5]} intensity={0.5} color="#a78fff" distance={2} />}
      </group>

      {/* Memory trail effect */}
      <points ref={trailRef}>
        <bufferGeometry />
        <primitive object={trailMaterial} attach="material" />
      </points>

      {/* Detailed information popup */}
      {showDetails && (
        <Html position={[0, 0, 1]} distanceFactor={8} transform>
          <div className="bg-black/80 backdrop-blur-md p-6 rounded-lg shadow-lg w-80 text-white">
            <h2 className="text-2xl font-bold mb-1">{artwork.name}</h2>
            <p className="text-sm mb-3 text-purple-300">by {artwork.artist}</p>

            <div className="mb-4">
              <div className="w-full h-0.5 bg-purple-500/30 mb-4"></div>
              <p className="text-sm mb-4">
                {artwork.description ||
                  "A stunning piece that captures the essence of modern art through vibrant colors and dynamic composition."}
              </p>

              <div className="grid grid-cols-2 gap-2 mb-4">
                <div>
                  <p className="text-xs text-gray-400">Medium</p>
                  <p className="text-sm">{artwork.medium || "Mixed media on canvas"}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400">Dimensions</p>
                  <p className="text-sm">{artwork.dimensions || "36 × 36 inches"}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400">Year</p>
                  <p className="text-sm">{artwork.year || "2023"}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400">Category</p>
                  <p className="text-sm">{artwork.type}</p>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center mb-4">
              <p className="text-xl font-semibold">{formatPrice(artwork.price)}</p>
              <div className="flex gap-1 text-yellow-500">{"★".repeat(5)}</div>
            </div>

            <div className="flex gap-2">
              <Button
                className="flex-1 rounded-full bg-[#a78fff] hover:bg-[#8a66ff]"
                onClick={(e) => {
                  e.stopPropagation()
                  onAddToCart(artwork)
                  try {
                    const audio = new Audio("/sounds/purchase.mp3")
                    audio.volume = 0.3
                    audio.play()
                  } catch (e) {
                    console.error("Audio playback failed:", e)
                  }
                }}
              >
                Add to Cart
              </Button>
              <Button
                variant="outline"
                className="rounded-full border-white/30 text-white hover:bg-white/10"
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

      {/* Proximity info that appears when close */}
      {showingInfo && !showDetails && (
        <Html position={[0, 0.8, 0]} distanceFactor={10} transform>
          <div className="bg-black/40 backdrop-blur-md py-1 px-3 rounded-full text-white text-xs animate-pulse">
            Click artwork to view details
          </div>
        </Html>
      )}
    </group>
  )
}
