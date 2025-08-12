"use client"

import { useEffect, useRef, useState } from "react"
import * as THREE from "three"

// Performance monitoring hook
export function usePerformance() {
  const [fps, setFps] = useState(60)
  const [drawCalls, setDrawCalls] = useState(0)
  const frameCount = useRef(0)
  const lastTime = useRef(performance.now())

  useEffect(() => {
    const updatePerformance = () => {
      frameCount.current++
      const currentTime = performance.now()

      if (currentTime - lastTime.current >= 1000) {
        setFps(Math.round((frameCount.current * 1000) / (currentTime - lastTime.current)))
        frameCount.current = 0
        lastTime.current = currentTime
      }

      requestAnimationFrame(updatePerformance)
    }

    updatePerformance()
  }, [])

  return { fps, drawCalls }
}

// Frustum culling hook
export function useFrustumCulling(camera: THREE.Camera, objects: THREE.Object3D[]) {
  const frustum = useRef(new THREE.Frustum())
  const matrix = useRef(new THREE.Matrix4())

  useEffect(() => {
    const updateCulling = () => {
      matrix.current.multiplyMatrices(camera.projectionMatrix, camera.matrixWorldInverse)
      frustum.current.setFromProjectionMatrix(matrix.current)

      objects.forEach((obj) => {
        if (obj.geometry) {
          obj.geometry.computeBoundingSphere()
          const visible = frustum.current.intersectsSphere(obj.geometry.boundingSphere!)
          obj.visible = visible
        }
      })
    }

    const interval = setInterval(updateCulling, 100) // Update every 100ms
    return () => clearInterval(interval)
  }, [camera, objects])
}
