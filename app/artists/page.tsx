"use client"

import { SiteHeader } from "@/components/layout/site-header"
import { SiteFooter } from "@/components/layout/site-footer"

export default function ArtistsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <SiteHeader />

      <main className="flex-1 py-8">
        <div className="container px-4 mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-semibold text-[#1d1d1f] mb-4">Artists</h1>
            <p className="text-lg text-[#86868b]">Meet the talented artists in our gallery</p>
          </div>

          <div className="text-center py-12">
            <p className="text-lg text-[#86868b]">Artist profiles coming soon!</p>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}
