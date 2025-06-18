"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Facebook, Twitter, Instagram, Youtube } from "lucide-react"

export function SiteFooter() {
  return (
    <footer className="bg-[#1a1a1a] text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <img src="/images/znzn-logo.png" alt="ARTWERKZZZZ Logo" className="h-6 w-6 invert" />
              <span className="text-xl font-bold">ARTWERKZZZZ</span>
            </div>
            <p className="text-gray-400 text-sm">
              Discover and collect extraordinary digital and physical artworks from emerging and established artists
              worldwide.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                <Facebook className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                <Instagram className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                <Youtube className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Explore</h3>
            <div className="space-y-2">
              <Link href="/store" className="block text-gray-400 hover:text-white text-sm transition-colors">
                Store
              </Link>
              <Link href="/paintings" className="block text-gray-400 hover:text-white text-sm transition-colors">
                Paintings
              </Link>
              <Link href="/sculptures" className="block text-gray-400 hover:text-white text-sm transition-colors">
                Sculptures
              </Link>
              <Link href="/digital" className="block text-gray-400 hover:text-white text-sm transition-colors">
                Digital Art
              </Link>
              <Link href="/collections" className="block text-gray-400 hover:text-white text-sm transition-colors">
                Collections
              </Link>
              <Link href="/artists" className="block text-gray-400 hover:text-white text-sm transition-colors">
                Artists
              </Link>
            </div>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Support</h3>
            <div className="space-y-2">
              <Link href="/help" className="block text-gray-400 hover:text-white text-sm transition-colors">
                Help Center
              </Link>
              <Link href="/contact" className="block text-gray-400 hover:text-white text-sm transition-colors">
                Contact Us
              </Link>
              <Link href="/shipping" className="block text-gray-400 hover:text-white text-sm transition-colors">
                Shipping Info
              </Link>
              <Link href="/returns" className="block text-gray-400 hover:text-white text-sm transition-colors">
                Returns
              </Link>
              <Link href="/faq" className="block text-gray-400 hover:text-white text-sm transition-colors">
                FAQ
              </Link>
            </div>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Stay Updated</h3>
            <p className="text-gray-400 text-sm">
              Subscribe to our newsletter for the latest artworks and exclusive offers.
            </p>
            <div className="space-y-2">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-gray-800 border-gray-700 text-white placeholder-gray-400"
              />
              <Button className="w-full bg-[#0071e3] hover:bg-[#0077ED] text-white">Subscribe</Button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">© 2022 ARTWERKZZZZ Inc. All rights reserved.</div>
            <div className="flex space-x-6">
              <Link href="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-white text-sm transition-colors">
                Terms of Service
              </Link>
              <Link href="/cookies" className="text-gray-400 hover:text-white text-sm transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
