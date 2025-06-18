import Link from "next/link"
import { Button } from "@/components/ui/button"
import { SiteHeader } from "@/components/layout/site-header"
import { SiteFooter } from "@/components/layout/site-footer"

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <SiteHeader />
      <main className="flex-1 flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <h1 className="text-6xl font-bold text-[#1d1d1f] mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-[#1d1d1f] mb-4">Page Not Found</h2>
          <p className="text-gray-600 mb-8">The page you're looking for doesn't exist or has been moved.</p>
          <div className="space-y-4">
            <Link href="/">
              <Button className="w-full rounded-full bg-[#0071e3] hover:bg-[#0077ED]">Return Home</Button>
            </Link>
            <Link href="/store">
              <Button variant="outline" className="w-full rounded-full">
                Browse Store
              </Button>
            </Link>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
