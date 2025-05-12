"use client"

import Link from "next/link"
import { Search, ShoppingBag, User, Menu, X, Headset } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/components/cart/cart-provider"
import { useSearch } from "@/components/search/search-provider"
import { useAuth } from "@/components/auth/auth-provider"
import { useState, useEffect } from "react"
import { CartDrawer } from "@/components/cart/cart-drawer"
import { SearchDialog } from "@/components/search/search-dialog"
import { MobileNav } from "@/components/layout/mobile-nav"
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"

export function SiteHeader() {
  const { cartCount, toggleCart, isCartOpen } = useCart()
  const { toggleSearch, isSearchOpen } = useSearch()
  const { user, openAuthDialog } = useAuth()
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()

  const isMetaversePage = pathname === "/metaverse"

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleMobileNav = () => {
    setIsMobileNavOpen(!isMobileNavOpen)
  }

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 w-full backdrop-blur-md transition-colors duration-200",
          isScrolled ? "bg-[#1a1a1a]/90" : "bg-[#1a1a1a]/80",
        )}
      >
        <div className="mx-auto flex h-11 max-w-[1000px] items-center justify-between">
          <div className="md:hidden pl-4">
            <Button variant="ghost" size="icon" onClick={toggleMobileNav} className="text-white">
              {isMobileNavOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>

          <nav className="hidden md:flex w-full items-center justify-center">
            <Link href="/" className="px-3 py-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5 text-white"
                aria-label="ARTWERKZZZZ Logo"
              >
                <path d="M12 2a9.96 9.96 0 0 0-7.071 2.929A9.96 9.96 0 0 0 2 12a9.96 9.96 0 0 0 2.929 7.071A9.96 9.96 0 0 0 12 22a9.96 9.96 0 0 0 7.071-2.929A9.96 9.96 0 0 0 22 12a9.96 9.96 0 0 0-2.929-7.071A9.96 9.96 0 0 0 12 2Z" />
                <path d="M12 2v20" />
                <path d="M2 12h20" />
              </svg>
            </Link>
            <Link
              href="/store"
              className="px-3 py-2 text-xs font-normal text-white hover:text-white/80 transition-colors"
            >
              Store
            </Link>
            <Link
              href="/paintings"
              className="px-3 py-2 text-xs font-normal text-white hover:text-white/80 transition-colors"
            >
              Paintings
            </Link>
            <Link
              href="/sculptures"
              className="px-3 py-2 text-xs font-normal text-white hover:text-white/80 transition-colors"
            >
              Sculptures
            </Link>
            <Link
              href="/digital"
              className="px-3 py-2 text-xs font-normal text-white hover:text-white/80 transition-colors"
            >
              Digital
            </Link>
            <Link
              href="/collections"
              className="px-3 py-2 text-xs font-normal text-white hover:text-white/80 transition-colors"
            >
              Collections
            </Link>
            <Link
              href="/artists"
              className="px-3 py-2 text-xs font-normal text-white hover:text-white/80 transition-colors"
            >
              Artists
            </Link>
            <Link
              href="/metaverse"
              className={`px-3 py-2 text-xs font-normal transition-colors flex items-center gap-1 ${
                isMetaversePage ? "text-[#0071e3]" : "text-white hover:text-white/80"
              }`}
            >
              <Headset className="h-3 w-3" />
              Metaverse
            </Link>
          </nav>

          <div className="flex items-center md:hidden">
            <Link href="/" className="px-3 py-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5 text-white"
                aria-label="ARTWERKZZZZ Logo"
              >
                <path d="M12 2a9.96 9.96 0 0 0-7.071 2.929A9.96 9.96 0 0 0 2 12a9.96 9.96 0 0 0 2.929 7.071A9.96 9.96 0 0 0 12 22a9.96 9.96 0 0 0 7.071-2.929A9.96 9.96 0 0 0 22 12a9.96 9.96 0 0 0-2.929-7.071A9.96 9.96 0 0 0 12 2Z" />
                <path d="M12 2v20" />
                <path d="M2 12h20" />
              </svg>
            </Link>
          </div>

          <div className="flex items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleSearch}
              className="px-3 py-2 text-white hover:text-white/80"
              aria-label="Search"
            >
              <Search className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={openAuthDialog}
              className="px-3 py-2 text-white hover:text-white/80"
              aria-label="Account"
            >
              <User className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleCart}
              className="px-3 py-2 text-white hover:text-white/80 relative"
              aria-label="Shopping Bag"
            >
              <ShoppingBag className="h-4 w-4" />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#0071e3] text-[10px] font-medium text-white">
                  {cartCount}
                </span>
              )}
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation */}
      <MobileNav isOpen={isMobileNavOpen} onClose={() => setIsMobileNavOpen(false)} />

      {/* Cart Drawer */}
      <CartDrawer />

      {/* Search Dialog */}
      <SearchDialog />
    </>
  )
}
