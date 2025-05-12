"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ChevronDown, ChevronRight, Headset } from "lucide-react"
import { cn } from "@/lib/utils"

interface MobileNavProps {
  isOpen: boolean
  onClose: () => void
}

export function MobileNav({ isOpen, onClose }: MobileNavProps) {
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null)

  // Close mobile nav when clicking outside or pressing escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }

    document.addEventListener("keydown", handleEscape)
    return () => document.removeEventListener("keydown", handleEscape)
  }, [onClose])

  // Prevent scrolling when mobile nav is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  const toggleSubmenu = (menu: string) => {
    setOpenSubmenu(openSubmenu === menu ? null : menu)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-40 bg-black/90 backdrop-blur-sm overflow-y-auto">
      <div className="pt-16 pb-8 px-6">
        <nav className="space-y-6">
          <div className="border-b border-white/10 pb-6">
            <Link href="/store" className="block py-2 text-lg font-medium text-white" onClick={onClose}>
              Store
            </Link>
          </div>

          <div className="border-b border-white/10 pb-6">
            <div
              className="flex items-center justify-between py-2 text-lg font-medium text-white"
              onClick={() => toggleSubmenu("paintings")}
            >
              <span>Paintings</span>
              {openSubmenu === "paintings" ? <ChevronDown className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
            </div>

            <div
              className={cn(
                "mt-2 ml-4 space-y-2 overflow-hidden transition-all duration-300",
                openSubmenu === "paintings" ? "max-h-96" : "max-h-0",
              )}
            >
              <Link href="/paintings/abstract" className="block py-1 text-white/80" onClick={onClose}>
                Abstract
              </Link>
              <Link href="/paintings/landscapes" className="block py-1 text-white/80" onClick={onClose}>
                Landscapes
              </Link>
              <Link href="/paintings/portraits" className="block py-1 text-white/80" onClick={onClose}>
                Portraits
              </Link>
              <Link href="/paintings/all" className="block py-1 text-white/80" onClick={onClose}>
                View All Paintings
              </Link>
            </div>
          </div>

          <div className="border-b border-white/10 pb-6">
            <div
              className="flex items-center justify-between py-2 text-lg font-medium text-white"
              onClick={() => toggleSubmenu("sculptures")}
            >
              <span>Sculptures</span>
              {openSubmenu === "sculptures" ? (
                <ChevronDown className="h-5 w-5" />
              ) : (
                <ChevronRight className="h-5 w-5" />
              )}
            </div>

            <div
              className={cn(
                "mt-2 ml-4 space-y-2 overflow-hidden transition-all duration-300",
                openSubmenu === "sculptures" ? "max-h-96" : "max-h-0",
              )}
            >
              <Link href="/sculptures/modern" className="block py-1 text-white/80" onClick={onClose}>
                Modern
              </Link>
              <Link href="/sculptures/classical" className="block py-1 text-white/80" onClick={onClose}>
                Classical
              </Link>
              <Link href="/sculptures/all" className="block py-1 text-white/80" onClick={onClose}>
                View All Sculptures
              </Link>
            </div>
          </div>

          <div className="border-b border-white/10 pb-6">
            <Link href="/digital" className="block py-2 text-lg font-medium text-white" onClick={onClose}>
              Digital
            </Link>
          </div>

          <div className="border-b border-white/10 pb-6">
            <Link href="/collections" className="block py-2 text-lg font-medium text-white" onClick={onClose}>
              Collections
            </Link>
          </div>

          <div className="border-b border-white/10 pb-6">
            <Link href="/artists" className="block py-2 text-lg font-medium text-white" onClick={onClose}>
              Artists
            </Link>
          </div>

          <div className="border-b border-white/10 pb-6">
            <Link
              href="/metaverse"
              className="flex items-center gap-2 py-2 text-lg font-medium text-white"
              onClick={onClose}
            >
              <Headset className="h-5 w-5" />
              Metaverse Gallery
            </Link>
          </div>

          <div>
            <Link href="/support" className="block py-2 text-lg font-medium text-white" onClick={onClose}>
              Support
            </Link>
          </div>
        </nav>
      </div>
    </div>
  )
}
