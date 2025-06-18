"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { SiteHeader } from "@/components/layout/site-header"
import { SiteFooter } from "@/components/layout/site-footer"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <SiteHeader />
      <main className="flex-1 flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <h1 className="text-6xl font-bold text-red-500 mb-4">Error</h1>
          <h2 className="text-2xl font-semibold text-[#1d1d1f] mb-4">Something went wrong</h2>
          <p className="text-gray-600 mb-8">We encountered an unexpected error. Please try again.</p>
          <div className="space-y-4">
            <Button onClick={reset} className="w-full rounded-full bg-[#0071e3] hover:bg-[#0077ED]">
              Try Again
            </Button>
            <Button variant="outline" className="w-full rounded-full" onClick={() => (window.location.href = "/")}>
              Return Home
            </Button>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
