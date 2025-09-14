import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"

import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import Footer from "../components/layout/Footer"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "StyleSwap AI - Transform Your Space with AI",
  description: "Upload your room photo and get AI-powered interior design transformations in seconds",
  generator: "StyleSwap AI",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`font-sans ${inter.variable} antialiased`}>
        <Suspense fallback={null}>{children}</Suspense>
        <Footer />
        <Analytics />
      </body>
    </html>
  )
}
