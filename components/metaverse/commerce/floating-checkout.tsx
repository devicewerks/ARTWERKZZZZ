"use client"

import { useState, useRef } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import { useCart } from "@/components/cart/cart-provider"

export function FloatingCheckout() {
  const [expanded, setExpanded] = useState(false)
  const { cartCount, items, totalPrice, updateQuantity, removeItem } = useCart()
  const { camera } = useThree()

  const orbRef = useRef()
  const ringRef = useRef()

  // Position the checkout to follow but stay at a fixed position in world space
  useFrame((state) => {})
}
