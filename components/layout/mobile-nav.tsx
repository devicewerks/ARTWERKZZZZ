"use client"

import Link from "next/link"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Headset, Home, Palette, Shapes, Monitor, Layers, Users } from "lucide-react"

interface MobileNavProps {
  isOpen: boolean
  onClose: () => void
}

export function MobileNav({ isOpen, onClose }: MobileNavProps) {
  const navItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/store", label: "Store", icon: Palette },
    { href: "/paintings", label: "Paintings", icon: Palette },
    { href: "/sculptures", label: "Sculptures", icon: Shapes },
    { href: "/digital", label: "Digital", icon: Monitor },
    { href: "/collections", label: "Collections", icon: Layers },
    { href: "/artists", label: "Artists", icon: Users },
    { href: "/metaverse", label: "Metaverse", icon: Headset },
  ]

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="left" className="w-[300px] sm:w-[400px]">
        <SheetHeader>
          <SheetTitle>Navigation</SheetTitle>
        </SheetHeader>
        <nav className="flex flex-col space-y-4 mt-6">
          {navItems.map((item) => {
            const Icon = item.icon
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className="flex items-center space-x-3 text-lg font-medium hover:text-[#0071e3] transition-colors"
              >
                <Icon className="h-5 w-5" />
                <span>{item.label}</span>
              </Link>
            )
          })}
        </nav>
      </SheetContent>
    </Sheet>
  )
}
