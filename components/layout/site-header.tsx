"use client"

import Link from "next/link"
import { Search, ShoppingBag, User, Menu, X, Headset } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { CartDrawer } from "@/components/cart/cart-drawer"
import { SearchDialog } from "@/components/search/search-dialog"
import { AuthDialog } from "@/components/auth/auth-dialog"
import { MobileNav } from "@/components/layout/mobile-nav"
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"
import { useCart } from "@/components/cart/cart-provider"
import { useSearch } from "@/components/search/search-provider"
import { useAuth } from "@/components/auth/auth-provider"

export function SiteHeader() {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  const pathname = usePathname()
  const isMetaversePage = pathname === "/metaverse"

  const cart = useCart()
  const search = useSearch()
  const auth = useAuth()

  // Initialize component
  useEffect(() => {
    setIsMounted(true)

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleMobileNav = () => {
    setIsMobileNavOpen(!isMobileNavOpen)
  }

  // Show loading state until mounted
  if (!isMounted) {
    return (
      <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-[#1a1a1a]/80">
        <div className="mx-auto flex h-11 max-w-[1000px] items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="px-3 py-2">
              <img
                src="/images/znzn-logo.png"
                alt="ARTWERKZZZZ - Premium Art Gallery Logo"
                className="h-5 w-5 invert"
              />
            </Link>
          </div>
          <div className="flex items-center">
            <Button variant="ghost" size="icon" className="px-3 py-2 text-white" aria-label="Search artworks">
              <Search className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="px-3 py-2 text-white" aria-label="User account">
              <User className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="px-3 py-2 text-white" aria-label="Shopping cart">
              <ShoppingBag className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>
    )
  }

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 w-full backdrop-blur-md transition-colors duration-200",
          isScrolled ? "bg-[#1a1a1a]/90" : "bg-[#1a1a1a]/80",
        )}
        role="banner"
      >
        <div className="mx-auto flex h-11 max-w-[1000px] items-center justify-between">
          <div className="md:hidden pl-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMobileNav}
              className="text-white"
              aria-label={isMobileNavOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={isMobileNavOpen}
            >
              {isMobileNavOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>

          <nav
            className="hidden md:flex w-full items-center justify-center"
            role="navigation"
            aria-label="Main navigation"
          >
            <Link href="/" className="px-3 py-2" aria-label="ARTWERKZZZZ homepage">
              <img
                src="/images/znzn-logo.png"
                alt="ARTWERKZZZZ - Premium Art Gallery Logo"
                className="h-5 w-5 invert"
              />
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
              aria-label="Enter Metaverse Gallery"
            >
              <Headset className="h-3 w-3" />
              Metaverse
            </Link>
          </nav>

          <div className="flex items-center md:hidden">
            <Link href="/" className="px-3 py-2" aria-label="ARTWERKZZZZ homepage">
              <img
                src="/images/znzn-logo.png"
                alt="ARTWERKZZZZ - Premium Art Gallery Logo"
                className="h-5 w-5 invert"
              />
            </Link>
          </div>

          <div className="flex items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={search.toggleSearch}
              className="px-3 py-2 text-white hover:text-white/80"
              aria-label="Search artworks and collections"
            >
              <Search className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={auth.openAuthDialog}
              className="px-3 py-2 text-white hover:text-white/80"
              aria-label="User account and authentication"
            >
              <User className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={cart.toggleCart}
              className="px-3 py-2 text-white hover:text-white/80 relative"
              aria-label={`Shopping cart with ${cart.cartCount} items`}
            >
              <ShoppingBag className="h-4 w-4" />
              {cart.cartCount > 0 && (
                <span
                  className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#0071e3] text-[10px] font-medium text-white"
                  aria-label={`${cart.cartCount} items in cart`}
                >
                  {cart.cartCount}
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

      {/* Auth Dialog */}
      <AuthDialog />
    </>
  )
}
