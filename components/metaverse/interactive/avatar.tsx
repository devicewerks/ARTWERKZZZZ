"use client"

import { useRef } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import * as THREE from "three"

export function UserAvatar() {
  const avatarRef = useRef<THREE.Group>(null)
  const trailRef = useRef<THREE.Points>(null)
  const { camera } = useThree()
  const trailPositions = useRef<THREE.Vector3[]>([])

  useFrame(() => {
    if (avatarRef.current && camera) {
      // Position avatar slightly behind and below camera
      const cameraPosition = camera.position.clone()
      avatarRef.current.position.copy(cameraPosition)
      avatarRef.current.position.y -= 0.5
      avatarRef.current.position.z -= 1

      // Update trail
      trailPositions.current.push(cameraPosition.clone())
      if (trailPositions.current.length > 50) {
        trailPositions.current.shift()
      }

      // Update trail geometry
      if (trailRef.current && trailPositions.current.length > 1) {
        const positions = new Float32Array(trailPositions.current.length * 3)
        trailPositions.current.forEach((pos, i) => {
          positions[i * 3] = pos.x
          positions[i * 3 + 1] = pos.y - 0.5
          positions[i * 3 + 2] = pos.z - 1
        })
        trailRef.current.geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3))
      }
    }
  })

  // Create trail geometry
  const trailGeometry = new THREE.BufferGeometry()
  const trailMaterial = new THREE.PointsMaterial({
    color: "#a78fff",
    size: 0.05,
    transparent: true,
    opacity: 0.6,
    blending: THREE.AdditiveBlending,
  })

  return (
    <group ref={avatarRef}>
      {/* Simple avatar representation */}
      <mesh>
        <sphereGeometry args={[0.1, 8, 8]} />
        <meshStandardMaterial color="#ffffff" emissive="#a78fff" emissiveIntensity={0.3} transparent opacity={0.7} />
      </mesh>

      {/* Movement trail */}
      <points ref={trailRef} geometry={trailGeometry} material={trailMaterial} />
    </group>
  )
}
