"use client"

import { useEffect, useRef, useState } from "react"
import { useThree, useFrame } from "@react-three/fiber"
import * as THREE from "three"

interface ControlsState {
  forward: boolean
  backward: boolean
  left: boolean
  right: boolean
  mouseX: number
  mouseY: number
}

// Enhanced first-person controls with WASD + mouse look
export function useFirstPersonControls(speed = 5, sensitivity = 0.002) {
  const { camera, gl } = useThree()
  const [controls, setControls] = useState<ControlsState>({
    forward: false,
    backward: false,
    left: false,
    right: false,
    mouseX: 0,
    mouseY: 0,
  })

  const velocity = useRef(new THREE.Vector3())
  const direction = useRef(new THREE.Vector3())
  const euler = useRef(new THREE.Euler(0, 0, 0, "YXZ"))
  const isLocked = useRef(false)

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.code) {
        case "KeyW":
        case "ArrowUp":
          setControls((prev) => ({ ...prev, forward: true }))
          break
        case "KeyS":
        case "ArrowDown":
          setControls((prev) => ({ ...prev, backward: true }))
          break
        case "KeyA":
        case "ArrowLeft":
          setControls((prev) => ({ ...prev, left: true }))
          break
        case "KeyD":
        case "ArrowRight":
          setControls((prev) => ({ ...prev, right: true }))
          break
      }
    }

    const handleKeyUp = (event: KeyboardEvent) => {
      switch (event.code) {
        case "KeyW":
        case "ArrowUp":
          setControls((prev) => ({ ...prev, forward: false }))
          break
        case "KeyS":
        case "ArrowDown":
          setControls((prev) => ({ ...prev, backward: false }))
          break
        case "KeyA":
        case "ArrowLeft":
          setControls((prev) => ({ ...prev, left: false }))
          break
        case "KeyD":
        case "ArrowRight":
          setControls((prev) => ({ ...prev, right: false }))
          break
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    document.addEventListener("keyup", handleKeyUp)

    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      document.removeEventListener("keyup", handleKeyUp)
    }
  }, [])

  // Mouse controls with pointer lock
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (!isLocked.current) return

      const movementX = event.movementX || 0
      const movementY = event.movementY || 0

      euler.current.setFromQuaternion(camera.quaternion)
      euler.current.y -= movementX * sensitivity
      euler.current.x -= movementY * sensitivity
      euler.current.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, euler.current.x))

      camera.quaternion.setFromEuler(euler.current)
    }

    const handlePointerLockChange = () => {
      isLocked.current = document.pointerLockElement === gl.domElement
    }

    const handleClick = () => {
      gl.domElement.requestPointerLock()
    }

    gl.domElement.addEventListener("click", handleClick)
    gl.domElement.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("pointerlockchange", handlePointerLockChange)

    return () => {
      gl.domElement.removeEventListener("click", handleClick)
      gl.domElement.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("pointerlockchange", handlePointerLockChange)
    }
  }, [camera, gl, sensitivity])

  // Movement frame update
  useFrame((state, delta) => {
    velocity.current.x -= velocity.current.x * 10.0 * delta
    velocity.current.z -= velocity.current.z * 10.0 * delta

    direction.current.z = Number(controls.forward) - Number(controls.backward)
    direction.current.x = Number(controls.right) - Number(controls.left)
    direction.current.normalize()

    if (controls.forward || controls.backward) {
      velocity.current.z -= direction.current.z * speed * delta
    }
    if (controls.left || controls.right) {
      velocity.current.x -= direction.current.x * speed * delta
    }

    camera.translateX(velocity.current.x * delta)
    camera.translateZ(velocity.current.z * delta)
  })

  return { isLocked: isLocked.current }
}
