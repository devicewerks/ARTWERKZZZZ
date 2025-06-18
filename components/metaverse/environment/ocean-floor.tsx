"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import type * as THREE from "three"

export function OceanFloor() {
  const floorRef = useRef<THREE.Mesh>(null)
  const waveRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (waveRef.current) {
      // Animate water waves
      waveRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1 - 2
      waveRef.current.rotation.z = state.clock.elapsedTime * 0.1
    }
  })

  return (
    <group>
      {/* Ocean floor */}
      <mesh ref={floorRef} position={[0, -5, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[200, 200, 50, 50]} />
        <meshStandardMaterial color="#1a4b5c" roughness={0.8} metalness={0.2} transparent opacity={0.8} />
      </mesh>

      {/* Water surface */}
      <mesh ref={waveRef} position={[0, -2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[100, 100, 32, 32]} />
        <meshPhysicalMaterial
          color="#006994"
          transmission={0.9}
          opacity={0.6}
          roughness={0.1}
          metalness={0.1}
          transparent
          envMapIntensity={1}
        />
      </mesh>

      {/* Underwater lighting */}
      <pointLight position={[0, -1, 0]} intensity={0.3} color="#4a9eff" distance={20} />
      <pointLight position={[10, -1, 10]} intensity={0.2} color="#4a9eff" distance={15} />
      <pointLight position={[-10, -1, -10]} intensity={0.2} color="#4a9eff" distance={15} />
    </group>
  )
}
