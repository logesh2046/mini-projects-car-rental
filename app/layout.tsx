import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import { cookies } from 'next/headers'
import { Navigation } from '@/components/navigation'
import "./globals.css"

export const metadata: Metadata = {
  title: {
    default: "CarRental - Premium Car Rental Services",
    template: "%s | CarRental",
  },
  description:
    "Rent premium cars with CarRental. Choose from luxury sedans, SUVs, and more. Best prices, 24/7 support, and comprehensive insurance included.",
  keywords: ["car rental", "luxury cars", "vehicle rental", "car hire", "premium cars", "SUV rental", "sedan rental"],
  authors: [{ name: "CarRental Team" }],
  creator: "CarRental",
  publisher: "CarRental",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://carrental.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://carrental.com",
    title: "CarRental - Premium Car Rental Services",
    description:
      "Rent premium cars with CarRental. Choose from luxury sedans, SUVs, and more. Best prices, 24/7 support, and comprehensive insurance included.",
    siteName: "CarRental",
  },
  twitter: {
    card: "summary_large_image",
    title: "CarRental - Premium Car Rental Services",
    description: "Rent premium cars with CarRental. Choose from luxury sedans, SUVs, and more.",
    creator: "@carrental",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "google-site-verification-code",
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  // Read server-side session cookie and parse user
  let user = null
  try {
    const cookieStore = cookies()
    const session = cookieStore.get('session')?.value
    if (session) {
      user = JSON.parse(session)
    }
  } catch (err) {
    // ignore parse errors
    user = null
  }

  // DEBUG: print parsed session for each server request (remove in production)
  try {
    // eslint-disable-next-line no-console
    console.log('[layout] parsed session user=', user)
  } catch (e) {}

  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} antialiased`}>
        <Suspense fallback={<div>Loading...</div>}>
          <div className="min-h-screen flex flex-col">
            <Navigation user={user} />
            {children}
          </div>
        </Suspense>
        <Analytics />
      </body>
    </html>
  )
}
