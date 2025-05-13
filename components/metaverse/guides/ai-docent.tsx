"use client"

import { useRef, useState } from "react"
import { useFrame } from "@react-three/fiber"
import { Html, Text } from "@react-three/drei"
import * as THREE from "three"
import { Vector3 } from "three"

// AI Docent that follows and guides the user
export function AiDocent({ target, artworks }) {
  const groupRef = useRef()
  const bodyRef = useRef()
  const screenRef = useRef()
  const [active, setActive] = useState(false)
  const [message, setMessage] = useState("Welcome to the ARTWERKZZZZ Gallery")
  const [nearbyArtwork, setNearbyArtwork] = useState(null)

  // Track docent movement
  const targetPosition = useRef(new Vector3())
  const currentPosition = useRef(new Vector3())

  // Set the docent to follow the camera with a delay
  useFrame((state) => {
    if (groupRef.current && target) {
      // Get target camera position
      const targetPos = new Vector3().copy(target.position)
      // Adjust height and distance
      targetPos.y -= 1

      // Calculate direction from camera to target position
      const direction = new Vector3().subVectors(targetPos, target.position).normalize()

      // Set target position 3 units behind and 0.5 units to the right of camera
      targetPosition.current
        .copy(target.position)
        .add(direction.multiplyScalar(-2.5))
        .add(new Vector3(0.8, 0, 0))

      // Smooth follow with easing
      currentPosition.current.lerp(targetPosition.current, 0.03)

      // Apply position
      groupRef.current.position.copy(currentPosition.current)

      // Make docent face the camera
      const lookAtPos = new Vector3().copy(target.position)
      groupRef.current.lookAt(lookAtPos)

      // Subtle hover animation
      if (bodyRef.current) {
        bodyRef.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.05 + 0.05
      }

      // Check for nearby artworks
      const docentPosition = new Vector3()
      groupRef.current.getWorldPosition(docentPosition)

      let closestArtwork = null
      let closestDistance = 10

      // Find the closest artwork
      artworks.forEach((artwork) => {
        const artworkPos = new Vector3(...artwork.position)
        const distance = docentPosition.distanceTo(artworkPos)

        if (distance < closestDistance) {
          closestDistance = distance
          closestArtwork = artwork
        }
      })

      // Update nearby artwork if changed
      if (closestArtwork !== nearbyArtwork && closestDistance < 8) {
        setNearbyArtwork(closestArtwork)
        setMessage(`This is "${closestArtwork.name}" by ${closestArtwork.artist}. Would you like to learn more?`)
      } else if (closestDistance > 10 && nearbyArtwork) {
        setNearbyArtwork(null)
        setMessage("Follow me to discover more amazing artworks.")
      }

      // Screen animation
      if (screenRef.current) {
        screenRef.current.rotation.y = state.clock.elapsedTime * 0.5
      }
    }
  })

  const handleClick = () => {
    setActive(!active)
    if (!active && nearbyArtwork) {
      setMessage(
        `"${nearbyArtwork.name}" is a ${nearbyArtwork.type.toLowerCase()} priced at $${nearbyArtwork.price}. The artist uses a unique approach to capture emotion through color and form.`,
      )
    } else if (!nearbyArtwork) {
      setMessage("Welcome to the ARTWERKZZZZ Gallery. I'm your AI guide. Click on me anytime for assistance.")
    }

    // Play sound
    try {
      const audio = new Audio("/sounds/beep.mp3")
      audio.volume = 0.2
      audio.play()
    } catch (e) {
      console.error("Audio playback failed:", e)
    }
  }

  return (
    <group ref={groupRef} position={[0, 1, -5]}>
      {/* Docent body - floating drone */}
      <group ref={bodyRef}>
        {/* Main body */}
        <mesh castShadow>
          <sphereGeometry args={[0.2, 16, 16]} />
          <meshStandardMaterial color="#333333" metalness={0.9} roughness={0.2} />
        </mesh>

        {/* Projection screen */}
        <group position={[0, 0.05, -0.15]}>
          <mesh ref={screenRef}>
            <boxGeometry args={[0.4, 0.3, 0.01]} />
            <meshStandardMaterial
              color="#000000"
              emissive="#a78fff"
              emissiveIntensity={0.5}
              metalness={0.7}
              roughness={0.3}
            />
          </mesh>

          {/* Artwork preview if near one */}
          {nearbyArtwork && (
            <mesh position={[0, 0, 0.01]} onClick={handleClick}>
              <planeGeometry args={[0.38, 0.28]} />
              <meshBasicMaterial
                map={new THREE.TextureLoader().load(nearbyArtwork.image, undefined, undefined, (error) => {
                  console.error("Error loading texture for AI docent preview:", error)
                })}
              />
            </mesh>
          )}
        </group>

        {/* Lights */}
        <pointLight position={[0, 0, 0.1]} intensity={0.2} color="#a78fff" distance={2} />

        {/* Small antennas */}
        <mesh position={[0.1, 0.25, 0]} castShadow>
          <cylinderGeometry args={[0.005, 0.005, 0.15, 8]} />
          <meshStandardMaterial color="#555555" />
        </mesh>
        <mesh position={[-0.1, 0.25, 0]} castShadow>
          <cylinderGeometry args={[0.005, 0.005, 0.15, 8]} />
          <meshStandardMaterial color="#555555" />
        </mesh>

        {/* Antigravity jets - subtle glowing rings */}
        <mesh position={[0, -0.15, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.12, 0.01, 8, 20]} />
          <meshStandardMaterial color="#a78fff" emissive="#a78fff" emissiveIntensity={1} transparent opacity={0.7} />
        </mesh>
      </group>

      {/* Speech bubble / info */}
      {active && (
        <Html position={[0, 0.5, 0]} distanceFactor={5} transform>
          <div className="bg-black/70 backdrop-blur-md p-4 rounded-md max-w-[200px] text-white text-xs">
            <p>{message}</p>
          </div>
        </Html>
      )}

      {/* Floating name */}
      <Text position={[0, -0.3, 0]} fontSize={0.06} color="#a78fff" anchorX="center" anchorY="top">
        AI Guide
      </Text>

      {/* Invisible hitbox for interaction */}
      <mesh onClick={handleClick} visible={false}>
        <sphereGeometry args={[0.5, 16, 16]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>
    </group>
  )
}
