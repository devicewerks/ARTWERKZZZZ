"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { Reflector } from "@react-three/drei"
import * as THREE from "three"

export function OceanFloor() {
  const discRef = useRef()
  const materialRef = useRef()

  useFrame((state) => {
    if (discRef.current) {
      // Subtle rotation
      discRef.current.rotation.z = state.clock.elapsedTime * 0.05
    }

    if (materialRef.current) {
      // Animate material
      materialRef.current.uniforms.time.value = state.clock.elapsedTime
    }
  })

  // Create a custom shader for the ocean floor
  const oceanShader = {
    uniforms: {
      tReflect: { value: null },
      color: { value: new THREE.Color(0x000000) },
      reflectivity: { value: 0.8 },
      time: { value: 0 },
    },
    vertexShader: `
      uniform float time;
      varying vec2 vUv;
      varying vec3 vPosition;
      
      void main() {
        vUv = uv;
        vPosition = position;
        
        // Add subtle wave effect
        float waveHeight = sin(position.x * 0.5 + time * 0.2) * sin(position.z * 0.5 + time * 0.3) * 0.05;
        vec3 pos = position;
        pos.y += waveHeight;
        
        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
      }
    `,
    fragmentShader: `
      uniform sampler2D tReflect;
      uniform vec3 color;
      uniform float reflectivity;
      uniform float time;
      varying vec2 vUv;
      varying vec3 vPosition;
      
      void main() {
        vec2 distortedUv = vUv;
        distortedUv.x += sin(distortedUv.y * 10.0 + time * 0.1) * 0.01;
        distortedUv.y += cos(distortedUv.x * 8.0 + time * 0.1) * 0.01;
        
        vec4 reflection = texture2D(tReflect, distortedUv);
        
        // Add ripple effect
        float ripple = sin(vPosition.x * 20.0 + time * 2.0) * sin(vPosition.z * 20.0 + time * 2.0) * 0.03;
        
        // Add color variation
        vec3 baseColor = mix(color, vec3(0.0, 0.1, 0.2), ripple + 0.5);
        
        gl_FragColor = vec4(baseColor, 1.0) + reflection * reflectivity;
      }
    `,
  }

  return (
    <>
      {/* Black-glass ocean floor with reflection */}
      <Reflector
        resolution={1024}
        args={[100, 100]}
        mirror={0.8}
        mixBlur={8}
        mixStrength={0.8}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -0.5, 0]}
        blur={[400, 100]}
      >
        {(Material, props) => (
          <Material ref={materialRef} {...props} color="#000000" metalness={0.9} roughness={0.05} />
        )}
      </Reflector>

      {/* Glowing circular platform */}
      <mesh ref={discRef} position={[0, -0.49, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <circleGeometry args={[50, 64]} />
        <meshStandardMaterial
          color="#140022"
          emissive="#32004d"
          emissiveIntensity={0.3}
          metalness={0.8}
          roughness={0.2}
          opacity={0.7}
          transparent
        />
      </mesh>

      {/* Add subtle fog near the ground */}
      <fog attach="fog" args={["#150033", 30, 100]} />
    </>
  )
}
