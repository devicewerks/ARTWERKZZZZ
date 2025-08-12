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
      <Stars radius={150} depth={80} count={8000} factor={6} saturation={0} fade speed={1} />

      <mesh>
        <sphereGeometry args={[200, 32, 16]} />
        <meshBasicMaterial side={THREE.BackSide} color="#000814" transparent opacity={0.9} />
      </mesh>

      {/* Floating clouds */}
      <group ref={cloudRef}>
        <Cloud position={[30, 20, -40]} speed={0.2} opacity={0.4} color="#ffffff" />
        <Cloud position={[-35, 25, -50]} speed={0.15} opacity={0.3} color="#ffffff" />
        <Cloud position={[0, 30, -60]} speed={0.1} opacity={0.35} color="#ffffff" />
      </group>

      <ambientLight intensity={0.3} color="#2a4a6b" />
      <directionalLight
        position={[15, 30, 10]}
        intensity={0.8}
        color="#ffffff"
        castShadow
        shadow-mapSize-width={4096}
        shadow-mapSize-height={4096}
        shadow-camera-far={80}
        shadow-camera-left={-40}
        shadow-camera-right={40}
        shadow-camera-top={40}
        shadow-camera-bottom={-40}
      />

      <pointLight position={[0, 15, 0]} intensity={0.4} color="#00ffff" distance={50} />
      <pointLight position={[20, 10, -20]} intensity={0.3} color="#ff00ff" distance={40} />
      <pointLight position={[-20, 10, 20]} intensity={0.3} color="#ffff00" distance={40} />
    </group>
  )
}
