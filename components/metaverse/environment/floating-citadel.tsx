"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

export function FloatingCitadel() {
  const groupRef = useRef<THREE.Group>(null)

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
      <mesh position={[0, 0, 0]} receiveShadow castShadow>
        <cylinderGeometry args={[22, 25, 1.5, 32]} />
        <meshStandardMaterial
          color="#000000"
          metalness={0.9}
          roughness={0.05}
          emissive="#001122"
          emissiveIntensity={0.1}
        />
      </mesh>

      <mesh position={[0, 0.2, 0]} receiveShadow>
        <cylinderGeometry args={[20, 20, 0.3, 32]} />
        <meshStandardMaterial
          color="#0a0a2e"
          emissive="#1a0040"
          emissiveIntensity={0.7}
          metalness={0.8}
          roughness={0.1}
        />
      </mesh>

      <mesh position={[0, 0.5, 0]} castShadow>
        <torusGeometry args={[8, 0.4, 16, 32]} />
        <meshStandardMaterial
          color="#00ffff"
          emissive="#00ffff"
          emissiveIntensity={1.2}
          metalness={0.9}
          roughness={0}
        />
      </mesh>

      <mesh position={[0, 0.6, 0]} castShadow>
        <torusGeometry args={[6, 0.2, 16, 32]} />
        <meshStandardMaterial color="#ff00ff" emissive="#ff00ff" emissiveIntensity={0.8} metalness={1} roughness={0} />
      </mesh>
    </group>
  )
}

function FloatingStructures() {
  return (
    <group>
      <BrutalistStructure position={[0, 1.5, 0]} scale={[2, 2.5, 2]} rotation={[0, Math.PI / 4, 0]} />

      {/* Surrounding structures with increased spacing */}
      <BrutalistStructure position={[-12, 3, -8]} scale={[1.2, 2, 1.2]} rotation={[0, Math.PI / 6, 0]} />
      <BrutalistStructure position={[15, 4, -5]} scale={[1.4, 2.2, 1.4]} rotation={[0, -Math.PI / 5, 0]} />
      <BrutalistStructure position={[-8, 2.5, 12]} scale={[1, 1.8, 1]} rotation={[0, Math.PI / 3, 0]} />
      <BrutalistStructure position={[12, 3.5, 10]} scale={[1.3, 2, 1.3]} rotation={[0, -Math.PI / 4, 0]} />

      <FloatingPavilion position={[-18, 5, -5]} scale={[1.5, 1, 1.5]} />
      <FloatingPavilion position={[18, 6, -8]} scale={[1.8, 1, 1.8]} rotation={[0, Math.PI / 6, 0]} />
      <FloatingPavilion position={[0, 8, -25]} scale={[2, 1, 2]} rotation={[0, Math.PI / 8, 0]} />
    </group>
  )
}

function BrutalistStructure({
  position = [0, 0, 0],
  scale = [1, 1, 1],
  rotation = [0, 0, 0],
}: {
  position?: [number, number, number]
  scale?: [number, number, number]
  rotation?: [number, number, number]
}) {
  const structureRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (structureRef.current) {
      // Very subtle floating motion
      structureRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.3 + position[0]) * 0.15
    }
  })

  return (
    <group ref={structureRef} position={position} scale={scale} rotation={rotation}>
      <mesh castShadow receiveShadow>
        <boxGeometry args={[5, 0.8, 5]} />
        <meshStandardMaterial
          color="#1a1a2e"
          metalness={0.8}
          roughness={0.1}
          emissive="#001122"
          emissiveIntensity={0.2}
        />
      </mesh>

      {/* Main structure body with improved textures */}
      <mesh position={[0, 2.5, 0]} castShadow>
        <boxGeometry args={[4.5, 5, 4.5]} />
        <meshStandardMaterial
          color="#2a2a4e"
          metalness={0.7}
          roughness={0.2}
          emissive="#000033"
          emissiveIntensity={0.1}
        />
      </mesh>

      <mesh position={[0, 5.5, 0]} castShadow>
        <boxGeometry args={[5, 0.8, 5]} />
        <meshStandardMaterial
          color="#1a1a2e"
          metalness={0.8}
          roughness={0.1}
          emissive="#00ffff"
          emissiveIntensity={0.3}
        />
      </mesh>

      <mesh position={[0, 2.5, 2.26]} castShadow>
        <boxGeometry args={[3, 3.5, 0.1]} />
        <meshStandardMaterial
          color="#000000"
          emissive="#00ffff"
          emissiveIntensity={0.8}
          metalness={0.9}
          roughness={0}
          opacity={0.8}
          transparent
        />
      </mesh>
      <mesh position={[2.26, 2.5, 0]} castShadow rotation={[0, Math.PI / 2, 0]}>
        <boxGeometry args={[3, 3.5, 0.1]} />
        <meshStandardMaterial
          color="#000000"
          emissive="#ff00ff"
          emissiveIntensity={0.8}
          metalness={0.9}
          roughness={0}
          opacity={0.8}
          transparent
        />
      </mesh>

      <pointLight position={[0, 4, 0]} intensity={0.5} color="#00ffff" distance={8} />
      <pointLight position={[0, 1, 0]} intensity={0.3} color="#ff00ff" distance={6} />
    </group>
  )
}

function FloatingPavilion({
  position = [0, 0, 0],
  scale = [1, 1, 1],
  rotation = [0, 0, 0],
}: {
  position?: [number, number, number]
  scale?: [number, number, number]
  rotation?: [number, number, number]
}) {
  const pavilionRef = useRef<THREE.Group>(null)

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

      {/* Glass dome - using sphereGeometry with proper parameters */}
      <mesh position={[0, 1, 0]} castShadow>
        <sphereGeometry args={[2.5, 16, 8, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshPhysicalMaterial
          color="#ffffff"
          transmission={0.95}
          opacity={0.3}
          metalness={0.1}
          roughness={0}
          clearcoat={1}
          clearcoatRoughness={0.1}
          transparent
        />
      </mesh>

      {/* Interior light */}
      <pointLight position={[0, 1, 0]} intensity={0.4} color="#ffffff" distance={6} />

      {/* Support columns */}
      {Array(6)
        .fill(null)
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
  return (
    <group>
      {/* Main walkway to central structure */}
      <mesh position={[0, 0.2, -7.5]} rotation={[0, 0, 0]} receiveShadow>
        <boxGeometry args={[3, 0.1, 15]} />
        <meshPhysicalMaterial
          color="#a78fff"
          roughness={0}
          metalness={0.2}
          transmission={0.9}
          opacity={0.5}
          transparent
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

function WalkwayConnection({
  start,
  end,
  width = 1,
}: {
  start: [number, number, number]
  end: [number, number, number]
  width?: number
}) {
  // Calculate the length of the walkway
  const length = Math.sqrt(
    Math.pow(end[0] - start[0], 2) + Math.pow(end[1] - start[1], 2) + Math.pow(end[2] - start[2], 2),
  )

  // Calculate the rotation to point from start to end
  const direction = new THREE.Vector3(end[0] - start[0], end[1] - start[1], end[2] - start[2]).normalize()
  const quaternion = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 0, 1), direction)
  const euler = new THREE.Euler().setFromQuaternion(quaternion)

  return (
    <group>
      {/* Create a simple straight walkway */}
      <mesh
        position={[(start[0] + end[0]) / 2, (start[1] + end[1]) / 2, (start[2] + end[2]) / 2]}
        rotation={[euler.x, euler.y, euler.z]}
        receiveShadow
      >
        <boxGeometry args={[width, 0.1, length]} />
        <meshPhysicalMaterial
          color="#a78fff"
          roughness={0}
          metalness={0.2}
          transmission={0.9}
          opacity={0.5}
          transparent
        />
      </mesh>
    </group>
  )
}

function HoverLights() {
  const lightRefs = useRef<(THREE.PointLight | null)[]>([])

  useFrame((state) => {
    lightRefs.current.forEach((light, i) => {
      if (light) {
        const angle = (i / 12) * Math.PI * 2
        const radius = 18
        light.position.y = 2 + Math.sin(state.clock.elapsedTime * 0.5 + i) * 0.4
        light.intensity = 0.7 + Math.sin(state.clock.elapsedTime + i * 1.5) * 0.3
      }
    })
  })

  return (
    <group>
      {Array(12)
        .fill(null)
        .map((_, i) => {
          const angle = (i / 12) * Math.PI * 2
          const radius = 18

          return (
            <group key={i}>
              <pointLight
                ref={(el) => (lightRefs.current[i] = el)}
                position={[Math.cos(angle) * radius, 2, Math.sin(angle) * radius]}
                intensity={0.7}
                color={i % 3 === 0 ? "#00ffff" : i % 3 === 1 ? "#ff00ff" : "#ffff00"}
                distance={12}
                castShadow
              />
              <mesh position={[Math.cos(angle) * radius, 2, Math.sin(angle) * radius]} castShadow>
                <sphereGeometry args={[0.3, 16, 16]} />
                <meshStandardMaterial
                  color={i % 3 === 0 ? "#00ffff" : i % 3 === 1 ? "#ff00ff" : "#ffff00"}
                  emissive={i % 3 === 0 ? "#00ffff" : i % 3 === 1 ? "#ff00ff" : "#ffff00"}
                  emissiveIntensity={1.2}
                  metalness={0.9}
                  roughness={0}
                />
              </mesh>
            </group>
          )
        })}
    </group>
  )
}
