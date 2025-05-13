"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

// Create a brutalist-inspired floating citadel
export function FloatingCitadel() {
  const groupRef = useRef()

  useFrame((state) => {
    if (groupRef.current) {
      // Subtle floating motion
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.1 + 0.8
      // Very slight rotation
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.05) * 0.02
    }
  })

  return (
    <group ref={groupRef}>
      {/* Main platform */}
      <MainPlatform />

      {/* Surrounding structures */}
      <FloatingStructures />

      {/* Connecting walkways */}
      <TranslucentWalkways />

      {/* Hover lights */}
      <HoverLights />

      {/* Ambient lighting for the citadel */}
      <ambientLight intensity={0.4} />
    </group>
  )
}

function MainPlatform() {
  return (
    <group>
      {/* Core structure - obsidian-like platform */}
      <mesh position={[0, 0, 0]} receiveShadow castShadow>
        <cylinderGeometry args={[15, 18, 1, 32]} />
        <meshStandardMaterial color="#000000" metalness={0.9} roughness={0.1} envMapIntensity={1} />
      </mesh>

      {/* Inner platform with glowing edges */}
      <mesh position={[0, 0.1, 0]} receiveShadow>
        <cylinderGeometry args={[14, 14, 0.2, 32]} />
        <meshStandardMaterial
          color="#140022"
          emissive="#32004d"
          emissiveIntensity={0.5}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>

      {/* Decorative center piece */}
      <mesh position={[0, 0.3, 0]} castShadow>
        <torusGeometry args={[5, 0.2, 16, 32]} />
        <meshStandardMaterial
          color="#a78fff"
          emissive="#7b61ff"
          emissiveIntensity={1}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>
    </group>
  )
}

function FloatingStructures() {
  // Create several brutalist-style structures floating around the platform
  return (
    <group>
      {/* Larger central structure */}
      <BrutalistStructure position={[0, 1, 0]} scale={[1.5, 2, 1.5]} rotation={[0, Math.PI / 4, 0]} />

      {/* Surrounding smaller structures */}
      <BrutalistStructure position={[-8, 2, -5]} scale={[0.8, 1.5, 0.8]} rotation={[0, Math.PI / 6, 0]} />
      <BrutalistStructure position={[10, 3, -2]} scale={[1, 1.8, 1]} rotation={[0, -Math.PI / 5, 0]} />
      <BrutalistStructure position={[-5, 1.5, 8]} scale={[0.7, 1.2, 0.7]} rotation={[0, Math.PI / 3, 0]} />
      <BrutalistStructure position={[7, 2.5, 7]} scale={[0.9, 1.4, 0.9]} rotation={[0, -Math.PI / 4, 0]} />

      {/* Floating pavilions */}
      <FloatingPavilion position={[-12, 4, 0]} scale={[1, 1, 1]} />
      <FloatingPavilion position={[12, 5, -2]} scale={[1.2, 1, 1.2]} rotation={[0, Math.PI / 6, 0]} />
      <FloatingPavilion position={[0, 6, -15]} scale={[1.5, 1, 1.5]} rotation={[0, Math.PI / 8, 0]} />
    </group>
  )
}

function BrutalistStructure({ position = [0, 0, 0], scale = [1, 1, 1], rotation = [0, 0, 0] }) {
  const structureRef = useRef()

  useFrame((state) => {
    if (structureRef.current) {
      // Very subtle floating motion
      structureRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.3 + position[0]) * 0.1
    }
  })

  return (
    <group ref={structureRef} position={position} scale={scale} rotation={rotation}>
      {/* Base */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[4, 0.5, 4]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.7} roughness={0.2} />
      </mesh>

      {/* Main structure body */}
      <mesh position={[0, 2, 0]} castShadow>
        <boxGeometry args={[3.5, 4, 3.5]} />
        <meshStandardMaterial color="#333333" metalness={0.6} roughness={0.3} />
      </mesh>

      {/* Top */}
      <mesh position={[0, 4.5, 0]} castShadow>
        <boxGeometry args={[4, 0.5, 4]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.7} roughness={0.2} />
      </mesh>

      {/* Windows/cuts in the structure (brutalist style) */}
      <mesh position={[0, 2, 1.76]} castShadow>
        <boxGeometry args={[2, 2.5, 0.1]} />
        <meshStandardMaterial
          color="#000000"
          emissive="#150033"
          emissiveIntensity={0.5}
          metalness={0.9}
          roughness={0.1}
          opacity={0.7}
          transparent
        />
      </mesh>
      <mesh position={[1.76, 2, 0]} castShadow rotation={[0, Math.PI / 2, 0]}>
        <boxGeometry args={[2, 2.5, 0.1]} />
        <meshStandardMaterial
          color="#000000"
          emissive="#150033"
          emissiveIntensity={0.5}
          metalness={0.9}
          roughness={0.1}
          opacity={0.7}
          transparent
        />
      </mesh>

      {/* Accent light */}
      <pointLight position={[0, 3, 0]} intensity={0.3} color="#a78fff" distance={5} />
    </group>
  )
}

function FloatingPavilion({ position = [0, 0, 0], scale = [1, 1, 1], rotation = [0, 0, 0] }) {
  const pavilionRef = useRef()

  useFrame((state) => {
    if (pavilionRef.current) {
      // Floating motion
      pavilionRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.2 + position[0] * 2) * 0.15
      // Very slight rotation
      pavilionRef.current.rotation.y = rotation[1] + Math.sin(state.clock.elapsedTime * 0.1) * 0.02
    }
  })

  return (
    <group ref={pavilionRef} position={position} scale={scale} rotation={rotation}>
      {/* Main pavilion structure */}
      <mesh castShadow>
        <cylinderGeometry args={[3, 3, 0.2, 16]} />
        <meshStandardMaterial color="#444444" metalness={0.6} roughness={0.3} />
      </mesh>

      {/* Glass dome */}
      <mesh position={[0, 1, 0]} castShadow>
        <hemisphereGeometry args={[2.5, 2.5, 16, 8]} />
        <meshPhysicalMaterial
          color="#ffffff"
          transmission={0.95}
          opacity={0.3}
          metalness={0.1}
          roughness={0}
          envMapIntensity={1}
          clearcoat={1}
          clearcoatRoughness={0.1}
          transparent
        />
      </mesh>

      {/* Interior light */}
      <pointLight position={[0, 1, 0]} intensity={0.4} color="#ffffff" distance={6} />

      {/* Support columns */}
      {Array(6)
        .fill()
        .map((_, i) => {
          const angle = (i / 6) * Math.PI * 2
          return (
            <mesh key={i} position={[Math.cos(angle) * 2.5, 0.5, Math.sin(angle) * 2.5]} castShadow>
              <cylinderGeometry args={[0.1, 0.1, 1, 8]} />
              <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.2} />
            </mesh>
          )
        })}
    </group>
  )
}

function TranslucentWalkways() {
  const walkwayMaterialRef = useRef()

  useFrame((state) => {
    if (walkwayMaterialRef.current) {
      // Animate the walkway glow
      walkwayMaterialRef.current.opacity = 0.4 + Math.sin(state.clock.elapsedTime) * 0.1
    }
  })

  return (
    <group>
      {/* Main walkway to central structure */}
      <mesh position={[0, 0.2, -7.5]} rotation={[0, 0, 0]} receiveShadow>
        <boxGeometry args={[3, 0.1, 15]} />
        <meshPhysicalMaterial
          ref={walkwayMaterialRef}
          color="#a78fff"
          roughness={0}
          metalness={0.2}
          transmission={0.9}
          opacity={0.5}
          transparent
          envMapIntensity={1}
        />
      </mesh>

      {/* Connecting walkways */}
      <WalkwayConnection start={[0, 0.2, 0]} end={[-8, 2.1, -5]} width={1.5} />

      <WalkwayConnection start={[0, 0.2, 0]} end={[10, 3.1, -2]} width={1.5} />

      <WalkwayConnection start={[0, 0.2, 0]} end={[-5, 1.6, 8]} width={1.5} />

      <WalkwayConnection start={[0, 0.2, 0]} end={[7, 2.6, 7]} width={1.5} />
    </group>
  )
}

function WalkwayConnection({ start, end, width = 1 }) {
  // Calculate the midpoint with elevation
  const midX = (start[0] + end[0]) / 2
  const midY = Math.max(start[1], end[1]) + 1 // Add some curve by elevating the middle
  const midZ = (start[2] + end[2]) / 2

  // Calculate the length of the walkway
  const length = Math.sqrt(
    Math.pow(end[0] - start[0], 2) + Math.pow(end[1] - start[1], 2) + Math.pow(end[2] - start[2], 2),
  )

  // Calculate the rotation to point from start to end
  const direction = new THREE.Vector3(end[0] - start[0], end[1] - start[1], end[2] - start[2]).normalize()

  // Create a quaternion from the direction
  const quaternion = new THREE.Quaternion().setFromUnitVectors(
    new THREE.Vector3(0, 0, 1), // Default direction
    direction,
  )

  // Convert quaternion to Euler angles
  const euler = new THREE.Euler().setFromQuaternion(quaternion)

  return (
    <group>
      {/* Create a curved path using THREE.js curves */}
      <mesh position={start} rotation={euler} receiveShadow>
        <tubeGeometry
          args={[
            new THREE.CatmullRomCurve3([
              new THREE.Vector3(0, 0, 0),
              new THREE.Vector3(length / 4, midY - start[1], length / 4),
              new THREE.Vector3(length / 2, midY - start[1], length / 2),
              new THREE.Vector3(length, end[1] - start[1], length),
            ]),
            20, // tubular segments
            width / 2, // radius
            8, // radial segments
            false, // closed
          ]}
        />
        <meshPhysicalMaterial
          color="#a78fff"
          roughness={0}
          metalness={0.2}
          transmission={0.9}
          opacity={0.5}
          transparent
          envMapIntensity={1}
        />
      </mesh>

      {/* Railings (holographic) */}
      <mesh position={start} rotation={euler} receiveShadow>
        <tubeGeometry
          args={[
            new THREE.CatmullRomCurve3([
              new THREE.Vector3(width / 2, 0.5, 0),
              new THREE.Vector3(width / 2, midY - start[1] + 0.5, length / 2),
              new THREE.Vector3(width / 2, end[1] - start[1] + 0.5, length),
            ]),
            20, // tubular segments
            0.05, // radius
            8, // radial segments
            false, // closed
          ]}
        />
        <meshPhysicalMaterial
          color="#ffffff"
          emissive="#a78fff"
          emissiveIntensity={0.5}
          roughness={0}
          metalness={0.1}
          opacity={0.3}
          transparent
        />
      </mesh>

      <mesh position={start} rotation={euler} receiveShadow>
        <tubeGeometry
          args={[
            new THREE.CatmullRomCurve3([
              new THREE.Vector3(-width / 2, 0.5, 0),
              new THREE.Vector3(-width / 2, midY - start[1] + 0.5, length / 2),
              new THREE.Vector3(-width / 2, end[1] - start[1] + 0.5, length),
            ]),
            20, // tubular segments
            0.05, // radius
            8, // radial segments
            false, // closed
          ]}
        />
        <meshPhysicalMaterial
          color="#ffffff"
          emissive="#a78fff"
          emissiveIntensity={0.5}
          roughness={0}
          metalness={0.1}
          opacity={0.3}
          transparent
        />
      </mesh>
    </group>
  )
}

function HoverLights() {
  const lightRefs = useRef([])

  useFrame((state) => {
    lightRefs.current.forEach((light, i) => {
      if (light) {
        // Animate lights
        light.position.y = 1.5 + Math.sin(state.clock.elapsedTime * 0.5 + i) * 0.2
        light.intensity = 0.5 + Math.sin(state.clock.elapsedTime + i * 1.5) * 0.2
      }
    })
  })

  return (
    <group>
      {/* Create multiple hover lights distributed around the citadel */}
      {Array(8)
        .fill()
        .map((_, i) => {
          const angle = (i / 8) * Math.PI * 2
          const radius = 12

          return (
            <group key={i}>
              <pointLight
                ref={(el) => (lightRefs.current[i] = el)}
                position={[Math.cos(angle) * radius, 1.5, Math.sin(angle) * radius]}
                intensity={0.5}
                color={i % 2 === 0 ? "#a78fff" : "#e8b27d"}
                distance={8}
                castShadow
              />
              {/* Light housing */}
              <mesh position={[Math.cos(angle) * radius, 1.5, Math.sin(angle) * radius]} castShadow>
                <sphereGeometry args={[0.2, 16, 16]} />
                <meshStandardMaterial
                  color={i % 2 === 0 ? "#a78fff" : "#e8b27d"}
                  emissive={i % 2 === 0 ? "#a78fff" : "#e8b27d"}
                  emissiveIntensity={0.8}
                  metalness={0.9}
                  roughness={0.1}
                />
              </mesh>
            </group>
          )
        })}
    </group>
  )
}
