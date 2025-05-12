"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { AuthDialog } from "@/components/auth/auth-dialog"

type User = {
  id: string
  name: string
  email: string
} | null

type AuthContextType = {
  user: User
  isAuthDialogOpen: boolean
  openAuthDialog: () => void
  closeAuthDialog: () => void
  signIn: (email: string, password: string) => Promise<void>
  signUp: (name: string, email: string, password: string) => Promise<void>
  signOut: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>(null)
  const [isAuthDialogOpen, setIsAuthDialogOpen] = useState(false)

  // Check for saved user on mount
  useEffect(() => {
    const savedUser = localStorage.getItem("user")
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser))
      } catch (error) {
        console.error("Failed to parse user from localStorage:", error)
      }
    }
  }, [])

  const openAuthDialog = () => {
    setIsAuthDialogOpen(true)
  }

  const closeAuthDialog = () => {
    setIsAuthDialogOpen(false)
  }

  const signIn = async (email: string, password: string) => {
    // Simulate API call
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        // For demo purposes, accept any credentials
        const newUser = {
          id: "user-" + Math.random().toString(36).substr(2, 9),
          name: email.split("@")[0],
          email,
        }

        setUser(newUser)
        localStorage.setItem("user", JSON.stringify(newUser))
        closeAuthDialog()
        resolve()
      }, 1000)
    })
  }

  const signUp = async (name: string, email: string, password: string) => {
    // Simulate API call
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        const newUser = {
          id: "user-" + Math.random().toString(36).substr(2, 9),
          name,
          email,
        }

        setUser(newUser)
        localStorage.setItem("user", JSON.stringify(newUser))
        closeAuthDialog()
        resolve()
      }, 1000)
    })
  }

  const signOut = () => {
    setUser(null)
    localStorage.removeItem("user")
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthDialogOpen,
        openAuthDialog,
        closeAuthDialog,
        signIn,
        signUp,
        signOut,
      }}
    >
      {children}
      <AuthDialog />
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
