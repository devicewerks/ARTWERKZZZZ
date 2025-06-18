"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { Stars, Cloud } from "@react-three/drei"
import * as THREE from "three"

export function SkyScene() {
  const cloudRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (cloudRef.current) {
      cloudRef.current.rotation.y = state.clock.elapsedTime * 0.02
    }
  })

  return (
    <group>
      {/* Starfield */}
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

      {/* Gradient sky */}
      <mesh>
        <sphereGeometry args={[150, 32, 16]} />
        <meshBasicMaterial side={THREE.BackSide} color="#000814" transparent opacity={0.8} />
      </mesh>

      {/* Floating clouds */}
      <group ref={cloudRef}>
        <Cloud position={[20, 15, -30]} speed={0.2} opacity={0.3} color="#ffffff" />
        <Cloud position={[-25, 20, -40]} speed={0.15} opacity={0.2} color="#ffffff" />
        <Cloud position={[0, 25, -50]} speed={0.1} opacity={0.25} color="#ffffff" />
      </group>

      {/* Ambient lighting */}
      <ambientLight intensity={0.2} color="#4a5568" />
      <directionalLight
        position={[10, 20, 5]}
        intensity={0.5}
        color="#ffffff"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={50}
        shadow-camera-left={-20}
        shadow-camera-right={20}
        shadow-camera-top={20}
        shadow-camera-bottom={-20}
      />
    </group>
  )
}
