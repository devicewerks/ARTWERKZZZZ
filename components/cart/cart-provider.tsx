"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { toast } from "@/components/ui/use-toast"

export type CartItem = {
  id: string
  name: string
  price: number
  image: string
  quantity: number
  artist: string
  type: string
}

type CartContextType = {
  items: CartItem[]
  cartCount: number
  totalPrice: number
  isCartOpen: boolean
  addItem: (item: Omit<CartItem, "quantity">) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  toggleCart: () => void
}

const CartContext = createContext<CartContextType | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isInitialized, setIsInitialized] = useState(false)

  // Initialize cart from localStorage
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("artwerkzzzz-cart")
      if (savedCart) {
        const parsedCart = JSON.parse(savedCart)
        if (Array.isArray(parsedCart)) {
          setItems(parsedCart)
        }
      }
    } catch (error) {
      console.error("Failed to load cart from localStorage:", error)
      localStorage.removeItem("artwerkzzzz-cart")
    } finally {
      setIsInitialized(true)
    }
  }, [])

  // Save cart to localStorage when items change
  useEffect(() => {
    if (isInitialized) {
      try {
        localStorage.setItem("artwerkzzzz-cart", JSON.stringify(items))
      } catch (error) {
        console.error("Failed to save cart to localStorage:", error)
      }
    }
  }, [items, isInitialized])

  const cartCount = items.reduce((total, item) => total + item.quantity, 0)
  const totalPrice = items.reduce((total, item) => total + item.price * item.quantity, 0)

  const addItem = (newItem: Omit<CartItem, "quantity">) => {
    setItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex((item) => item.id === newItem.id)

      if (existingItemIndex > -1) {
        const updatedItems = [...prevItems]
        updatedItems[existingItemIndex].quantity += 1

        if (isInitialized) {
          toast({
            title: "Item added to cart",
            description: `${newItem.name} quantity increased to ${updatedItems[existingItemIndex].quantity}`,
          })
        }

        return updatedItems
      } else {
        if (isInitialized) {
          toast({
            title: "Item added to cart",
            description: `${newItem.name} added to your cart`,
          })
        }

        return [...prevItems, { ...newItem, quantity: 1 }]
      }
    })

    setIsCartOpen(true)
  }

  const removeItem = (id: string) => {
    setItems((prevItems) => {
      const itemToRemove = prevItems.find((item) => item.id === id)

      if (itemToRemove && isInitialized) {
        toast({
          title: "Item removed",
          description: `${itemToRemove.name} removed from your cart`,
        })
      }

      return prevItems.filter((item) => item.id !== id)
    })
  }

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) return
    setItems((prevItems) => prevItems.map((item) => (item.id === id ? { ...item, quantity } : item)))
  }

  const clearCart = () => {
    setItems([])
    if (isInitialized) {
      toast({
        title: "Cart cleared",
        description: "All items have been removed from your cart",
      })
    }
  }

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen)
  }

  const value: CartContextType = {
    items,
    cartCount,
    totalPrice,
    isCartOpen,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    toggleCart,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart(): CartContextType {
  const context = useContext(CartContext)

  if (!context) {
    throw new Error(
      "useCart must be used within a CartProvider. Make sure your component is wrapped with CartProvider in your app layout or _app file.",
    )
  }

  return context
}
