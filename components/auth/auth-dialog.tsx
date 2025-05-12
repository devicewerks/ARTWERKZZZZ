"use client"

import type React from "react"

import { useState } from "react"
import { useAuth } from "@/components/auth/auth-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { X, Loader2 } from "lucide-react"
import { toast } from "@/components/ui/use-toast"

export function AuthDialog() {
  const { isAuthDialogOpen, closeAuthDialog, signIn, signUp, user, signOut } = useAuth()
  const [isSignUp, setIsSignUp] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email || !password || (isSignUp && !name)) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      if (isSignUp) {
        await signUp(name, email, password)
        toast({
          title: "Account created",
          description: "Welcome to ARTWERKZZZZ!",
        })
      } else {
        await signIn(email, password)
        toast({
          title: "Signed in",
          description: "Welcome back!",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleSignOut = () => {
    signOut()
    closeAuthDialog()
    toast({
      title: "Signed out",
      description: "You have been signed out successfully",
    })
  }

  if (!isAuthDialogOpen) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm">
      <div className="absolute inset-0" onClick={closeAuthDialog} aria-hidden="true" />

      <div className="absolute left-1/2 top-1/2 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-xl bg-white p-6 shadow-2xl animate-in fade-in-0 zoom-in-95">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">{user ? "Account" : isSignUp ? "Create Account" : "Sign In"}</h2>
          <Button variant="ghost" size="icon" onClick={closeAuthDialog} aria-label="Close">
            <X className="h-5 w-5" />
          </Button>
        </div>

        {user ? (
          <div className="mt-6 space-y-4">
            <div className="rounded-lg bg-muted p-4">
              <p className="font-medium">{user.name}</p>
              <p className="text-sm text-muted-foreground">{user.email}</p>
            </div>

            <div className="flex flex-col gap-2">
              <Button variant="outline" className="w-full justify-start" onClick={closeAuthDialog}>
                My Orders
              </Button>
              <Button variant="outline" className="w-full justify-start" onClick={closeAuthDialog}>
                Saved Items
              </Button>
              <Button variant="outline" className="w-full justify-start" onClick={closeAuthDialog}>
                Account Settings
              </Button>
            </div>

            <Button variant="destructive" className="w-full" onClick={handleSignOut}>
              Sign Out
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            {isSignUp && (
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  disabled={isLoading}
                />
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your.email@example.com"
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                disabled={isLoading}
              />
            </div>

            <Button type="submit" className="w-full rounded-full bg-[#0071e3] hover:bg-[#0077ED]" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {isSignUp ? "Creating Account..." : "Signing In..."}
                </>
              ) : isSignUp ? (
                "Create Account"
              ) : (
                "Sign In"
              )}
            </Button>

            <div className="text-center">
              <Button
                type="button"
                variant="link"
                className="text-xs text-muted-foreground"
                onClick={() => setIsSignUp(!isSignUp)}
                disabled={isLoading}
              >
                {isSignUp ? "Already have an account? Sign In" : "Don't have an account? Sign Up"}
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
