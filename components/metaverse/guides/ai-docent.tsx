"use client"

import { useRef, useState } from "react"
import { useFrame } from "@react-three/fiber"
import { Html } from "@react-three/drei"
import type * as THREE from "three"

interface AiDocentProps {
  target: THREE.Camera | null
  artworks: any[]
}

export function AiDocent({ target, artworks }: AiDocentProps) {
  const docentRef = useRef<THREE.Group>(null)
  const [showInfo, setShowInfo] = useState(false)
  const [currentTip, setCurrentTip] = useState(0)

  const tips = [
    "Click on artworks to view details and purchase",
    "Use mouse to navigate around the gallery",
    "Scroll to zoom in and out",
    "Each artwork responds to your presence",
    "Explore the floating citadel structures",
  ]

  useFrame((state) => {
    if (docentRef.current && target) {
      // Follow the camera at a distance
      const cameraPosition = target.position
      docentRef.current.position.x = cameraPosition.x + 3
      docentRef.current.position.y = cameraPosition.y + 1
      docentRef.current.position.z = cameraPosition.z + 2

      // Face the camera
      docentRef.current.lookAt(cameraPosition)

      // Gentle floating animation
      docentRef.current.position.y += Math.sin(state.clock.elapsedTime * 2) * 0.05
    }
  })

  return (
    <group ref={docentRef}>
      {/* AI Docent visual representation */}
      <mesh
        onClick={() => setShowInfo(!showInfo)}
        onPointerOver={() => setShowInfo(true)}
        onPointerOut={() => setShowInfo(false)}
      >
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshStandardMaterial color="#a78fff" emissive="#7b61ff" emissiveIntensity={0.5} transparent opacity={0.8} />
      </mesh>

      {/* Floating rings around the docent */}
      <mesh rotation={[0, 0, Math.PI / 4]}>
        <torusGeometry args={[0.5, 0.05, 8, 16]} />
        <meshStandardMaterial color="#ffffff" emissive="#a78fff" emissiveIntensity={0.3} transparent opacity={0.6} />
      </mesh>

      {/* Info panel */}
      {showInfo && (
        <Html position={[0, 1, 0]} center>
          <div className="bg-black/80 text-white p-3 rounded-lg max-w-xs text-center">
            <h4 className="font-bold mb-2">AI Gallery Guide</h4>
            <p className="text-sm mb-2">{tips[currentTip]}</p>
            <button
              className="text-xs text-blue-300 hover:text-blue-200"
              onClick={() => setCurrentTip((prev) => (prev + 1) % tips.length)}
            >
              Next Tip →
            </button>
          </div>
        </Html>
      )}

      {/* Ambient light from the docent */}
      <pointLight position={[0, 0, 0]} intensity={0.3} color="#a78fff" distance={5} />
    </group>
  )
}
