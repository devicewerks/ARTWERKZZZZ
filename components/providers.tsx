"use client"

import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { CartProvider } from "@/components/cart/cart-provider"
import { SearchProvider } from "@/components/search/search-provider"
import { AuthProvider } from "@/components/auth/auth-provider"
import { useState, useEffect, type ReactNode } from "react"

export function Providers({ children }: { children: ReactNode }) {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return (
      <div className="min-h-screen bg-white">
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-gray-600">Loading...</div>
        </div>
      </div>
    )
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <CartProvider>
        <AuthProvider>
          <SearchProvider>
            {children}
            <Toaster />
          </SearchProvider>
        </AuthProvider>
      </CartProvider>
    </ThemeProvider>
  )
}
