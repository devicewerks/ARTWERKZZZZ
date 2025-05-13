"use client"

import { useRef, useState, useMemo } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import * as THREE from "three"

// User avatar representation and memory trail
export function UserAvatar() {
  const { camera } = useThree()
  const trailRef = useRef()
  const trailGeometryRef = useRef(new THREE.BufferGeometry())
  const trailPoints = useRef([])
  const [userColor] = useState(
    new THREE.Color(
      Math.random() * 0.3 + 0.7, // Higher red component for visibility
      Math.random() * 0.5,
      Math.random() * 0.5 + 0.5, // Add some blue for purple tints
    ),
  )

  // Trail material with custom shading
  const trailMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
      },
      vertexShader: `
        attribute float size;
        attribute vec3 customColor;
        varying vec3 vColor;
        
        void main() {
          vColor = customColor;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = size * (300.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        
        void main() {
          // Create a circular point with soft edges
          float r = distance(gl_PointCoord, vec2(0.5, 0.5));
          if (r > 0.5) discard;
          
          // Fade out towards the edges
          float alpha = smoothstep(0.5, 0.2, r);
          gl_FragColor = vec4(vColor, alpha);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })
  }, [])

  // Update the trail on each frame
  useFrame((state) => {
    if (trailRef.current && camera) {
      // Update shader time uniform
      trailMaterial.uniforms.time.value = state.clock.elapsedTime

      // Add new point to trail when moving
      if (
        trailPoints.current.length === 0 ||
        trailPoints.current[trailPoints.current.length - 1].position.distanceTo(camera.position) > 0.1
      ) {
        trailPoints.current.push({
          position: camera.position.clone(),
          size: Math.random() * 3 + 2,
          life: 1.0,
        })
      }

      // Update trail points
      const positions = []
      const sizes = []
      const colors = []

      trailPoints.current = trailPoints.current
        .map((point) => {
          point.life -= 0.01
          return point
        })
        .filter((point) => {
          if (point.life > 0) {
            positions.push(point.position.x, point.position.y - 1, point.position.z)
            sizes.push(point.size * point.life)

            // Fade from user color to dimmer version
            const color = userColor.clone()
            color.multiplyScalar(point.life * 0.7)
            colors.push(color.r, color.g, color.b)

            return true
          }
          return false
        })

      // Update the geometry attributes
      if (positions.length > 0) {
        trailGeometryRef.current.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3))
        trailGeometryRef.current.setAttribute("size", new THREE.Float32BufferAttribute(sizes, 1))
        trailGeometryRef.current.setAttribute("customColor", new THREE.Float32BufferAttribute(colors, 3))
      }
    }
  })

  return (
    <>
      {/* Memory trail effect */}
      <points ref={trailRef}>
        <primitive object={trailGeometryRef.current} attach="geometry" />
        <primitive object={trailMaterial} attach="material" />
      </points>
    </>
  )
}
