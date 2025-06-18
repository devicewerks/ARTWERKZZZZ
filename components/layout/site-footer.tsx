import Link from "next/link"

export function SiteFooter() {
  return (
    <footer className="bg-[#f5f5f7] py-12 text-[#86868b]">
      <div className="mx-auto max-w-[1000px] px-4">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-5">
          <div>
            <h4 className="mb-4 text-xs font-semibold text-[#1d1d1f]">Shop and Learn</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/store" className="hover:underline">
                  Store
                </Link>
              </li>
              <li>
                <Link href="/paintings" className="hover:underline">
                  Paintings
                </Link>
              </li>
              <li>
                <Link href="/sculptures" className="hover:underline">
                  Sculptures
                </Link>
              </li>
              <li>
                <Link href="/digital" className="hover:underline">
                  Digital Art
                </Link>
              </li>
              <li>
                <Link href="/collections" className="hover:underline">
                  Collections
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4 text-xs font-semibold text-[#1d1d1f]">Services</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/services/framing" className="hover:underline">
                  ARTWERKZZZZ Framing
                </Link>
              </li>
              <li>
                <Link href="/services/consultation" className="hover:underline">
                  Art Consultation
                </Link>
              </li>
              <li>
                <Link href="/services/shipping" className="hover:underline">
                  Shipping & Delivery
                </Link>
              </li>
              <li>
                <Link href="/services/financing" className="hover:underline">
                  Financing
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4 text-xs font-semibold text-[#1d1d1f]">ARTWERKZZZZ Store</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/stores/find" className="hover:underline">
                  Find a Store
                </Link>
              </li>
              <li>
                <Link href="/stores/exhibitions" className="hover:underline">
                  Exhibitions
                </Link>
              </li>
              <li>
                <Link href="/stores/workshops" className="hover:underline">
                  Workshops
                </Link>
              </li>
              <li>
                <Link href="/stores/tours" className="hover:underline">
                  Virtual Tours
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4 text-xs font-semibold text-[#1d1d1f]">For Artists</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/artists/submit" className="hover:underline">
                  Submit Your Work
                </Link>
              </li>
              <li>
                <Link href="/artists/resources" className="hover:underline">
                  Artist Resources
                </Link>
              </li>
              <li>
                <Link href="/artists/spotlight" className="hover:underline">
                  Artist Spotlight
                </Link>
              </li>
              <li>
                <Link href="/artists/commissions" className="hover:underline">
                  Commissions
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4 text-xs font-semibold text-[#1d1d1f]">About ARTWERKZZZZ</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/about/newsroom" className="hover:underline">
                  Newsroom
                </Link>
              </li>
              <li>
                <Link href="/about/leadership" className="hover:underline">
                  Leadership
                </Link>
              </li>
              <li>
                <Link href="/about/careers" className="hover:underline">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/about/ethics" className="hover:underline">
                  Ethics & Compliance
                </Link>
              </li>
              <li>
                <Link href="/about/contact" className="hover:underline">
                  Contact ARTWERKZZZZ
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-[#d2d2d7] pt-8 text-xs">
          <p>
            More ways to shop:{" "}
            <Link href="/stores/find" className="text-[#0066CC] hover:underline">
              Find an ARTWERKZZZZ Store
            </Link>{" "}
            or{" "}
            <Link href="/stores/retailers" className="text-[#0066CC] hover:underline">
              other retailer
            </Link>{" "}
            near you. Or call 1-800-ART-WERK.
          </p>
          <div className="mt-4 flex flex-col md:flex-row md:justify-between">
            <p>Copyright © 2022 ARTWERKZZZZ Inc. All rights reserved.</p>
            <div className="mt-4 md:mt-0 flex flex-wrap gap-4">
              <Link href="/legal/privacy" className="hover:underline">
                Privacy Policy
              </Link>
              <span className="text-[#d2d2d7]">|</span>
              <Link href="/legal/terms" className="hover:underline">
                Terms of Use
              </Link>
              <span className="text-[#d2d2d7]">|</span>
              <Link href="/legal/sales" className="hover:underline">
                Sales Policy
              </Link>
              <span className="text-[#d2d2d7]">|</span>
              <Link href="/legal" className="hover:underline">
                Legal
              </Link>
              <span className="text-[#d2d2d7]">|</span>
              <Link href="/sitemap" className="hover:underline">
                Site Map
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-4 text-xs">
          <p>
            <Link href="https://artwerkzzzz.com" className="hover:underline">
              artwerkzzzz.com
            </Link>
          </p>
          <p className="mt-2">Images sourced from Unsplash for demonstration purposes only.</p>
        </div>
      </div>
    </footer>
  )
}
