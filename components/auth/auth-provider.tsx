"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

type User = {
  id: string
  name: string
  email: string
  avatar?: string
}

type AuthContextType = {
  user: User | null
  isAuthOpen: boolean
  openAuthDialog: () => void
  closeAuthDialog: () => void
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  register: (name: string, email: string, password: string) => Promise<void>
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isAuthOpen, setIsAuthOpen] = useState(false)

  const openAuthDialog = () => {
    setIsAuthOpen(true)
  }

  const closeAuthDialog = () => {
    setIsAuthOpen(false)
  }

  const login = async (email: string, password: string) => {
    // Mock login - in real app, this would call an API
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setUser({
      id: "1",
      name: "John Doe",
      email,
      avatar: "/placeholder-user.jpg",
    })
    setIsAuthOpen(false)
  }

  const logout = () => {
    setUser(null)
  }

  const register = async (name: string, email: string, password: string) => {
    // Mock register - in real app, this would call an API
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setUser({
      id: "1",
      name,
      email,
      avatar: "/placeholder-user.jpg",
    })
    setIsAuthOpen(false)
  }

  const value: AuthContextType = {
    user,
    isAuthOpen,
    openAuthDialog,
    closeAuthDialog,
    login,
    logout,
    register,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }

  return context
}
