"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { Stars, Cloud } from "@react-three/drei"
import * as THREE from "three"

export function SkyScene() {
  const starsRef = useRef()
  const cloudRef1 = useRef()
  const cloudRef2 = useRef()
  const cloudRef3 = useRef()

  // Aurora effect
  const auroraRef = useRef()
  const auroraGeometryRef = useRef()
  const auroraPointsRef = useRef()

  useFrame((state, delta) => {
    // Rotate stars slowly
    if (starsRef.current) {
      starsRef.current.rotation.y += delta * 0.01
    }

    // Move clouds slowly
    if (cloudRef1.current) {
      cloudRef1.current.position.x = Math.sin(state.clock.elapsedTime * 0.05) * 10
    }
    if (cloudRef2.current) {
      cloudRef2.current.position.z = Math.cos(state.clock.elapsedTime * 0.04) * 8
    }
    if (cloudRef3.current) {
      cloudRef3.current.position.x = Math.sin(state.clock.elapsedTime * 0.03) * 15
    }

    // Animate aurora if it exists
    if (auroraRef.current && auroraGeometryRef.current && auroraPointsRef.current) {
      const positions = auroraGeometryRef.current.attributes.position.array
      for (let i = 0; i < positions.length; i += 3) {
        const x = positions[i]
        const y = positions[i + 1]
        const z = positions[i + 2]

        // Create wave effect
        positions[i + 1] = y + Math.sin(x / 2 + state.clock.elapsedTime) * 0.2
      }
      auroraGeometryRef.current.attributes.position.needsUpdate = true
    }
  })

  // Create aurora effect
  const createAurora = () => {
    const points = []
    const width = 100
    const height = 20
    const depth = 50
    const count = 2000

    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * width
      const y = (Math.random() - 0.5) * height + 25 // Position above the scene
      const z = (Math.random() - 0.5) * depth
      points.push(new THREE.Vector3(x, y, z))
    }

    const geometry = new THREE.BufferGeometry().setFromPoints(points)
    auroraGeometryRef.current = geometry

    const material = new THREE.PointsMaterial({
      size: 0.2,
      color: new THREE.Color(0x8866ff),
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
    })

    const aurora = new THREE.Points(geometry, material)
    auroraPointsRef.current = aurora
    return aurora
  }

  return (
    <>
      {/* Deep violet sky */}
      <color attach="background" args={["#150033"]} />
      {/* Stars */}
      <Stars ref={starsRef} radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      {/* Ethereal mist/clouds */}
      <Cloud ref={cloudRef1} position={[0, -2, -10]} opacity={0.4} speed={0.4} width={20} depth={1.5} color="#a488e0" />
      <Cloud ref={cloudRef2} position={[-10, -1, 0]} opacity={0.3} speed={0.3} width={15} depth={1} color="#8f7cdc" />
      <Cloud
        ref={cloudRef3}
        position={[10, -1.5, -5]}
        opacity={0.25}
        speed={0.2}
        width={25}
        depth={2}
        color="#7b73d5"
      />
      {/* Aurora effect */}
      <primitive ref={auroraRef} object={createAurora()} />
      {/* Dynamic constellation (slowly moving larger star clusters) */}
      <group position={[0, 20, -30]} rotation={[0, 0, Math.PI / 6]}>
        <Stars radius={15} depth={10} count={500} factor={6} saturation={1} fade speed={0.5} />
      </group>
      <group position={[-25, 15, -20]} rotation={[0, 0, -Math.PI / 8]}>
        <Stars radius={10} depth={5} count={300} factor={5} saturation={1} fade speed={0.3} />
      </group>
      {/* Ambient light from the sky */}
      <ambientLight intensity={0.2} color="#6e4fa0" />
      {/* Main directional light (golden hour) */}
      <directionalLight
        position={[10, 10, 5]}
        intensity={0.8}
        color="#e8b27d" // Warm golden light
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      {/* Secondary light sources */}
      <pointLight position={[-15, 10, -10]} intensity={0.3} color="#ff9edb" /> {/* Rose gold accent */}
      <pointLight position={[15, 8, 10]} intensity={0.2} color="#7661db" /> {/* Purple accent */}
    </>
  )
}
