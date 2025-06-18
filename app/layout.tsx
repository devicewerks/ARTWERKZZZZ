import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Providers } from "@/components/providers"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "ARTWERKZZZZ INC | Metaverse Art Gallery",
  description:
    "Discover and collect exceptional artwork in our immersive metaverse gallery. Browse paintings, sculptures, digital art, and more from talented artists worldwide.",
  keywords: "art gallery, metaverse, digital art, paintings, sculptures, NFT, virtual reality, art collection",
  authors: [{ name: "ARTWERKZZZZ INC" }],
  creator: "ARTWERKZZZZ INC",
  publisher: "ARTWERKZZZZ INC",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://artwerkzzzz.com",
    title: "ARTWERKZZZZ INC | Metaverse Art Gallery",
    description: "Discover and collect exceptional artwork in our immersive metaverse gallery",
    siteName: "ARTWERKZZZZ",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "ARTWERKZZZZ Metaverse Art Gallery",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ARTWERKZZZZ INC | Metaverse Art Gallery",
    description: "Discover and collect exceptional artwork in our immersive metaverse gallery",
    images: ["/images/og-image.jpg"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
  },
  metadataBase: new URL("https://artwerkzzzz.com"),
  generator: "Next.js",
  applicationName: "ARTWERKZZZZ",
  referrer: "origin-when-cross-origin",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  manifest: "/site.webmanifest",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="theme-color" content="#000000" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon-16x16.png" sizes="16x16" type="image/png" />
        <link rel="icon" href="/favicon-32x32.png" sizes="32x32" type="image/png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" sizes="180x180" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
