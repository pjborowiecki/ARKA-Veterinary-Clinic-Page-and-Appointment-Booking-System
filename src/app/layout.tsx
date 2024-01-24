import "@/styles/globals.css"

import * as React from "react"
import type { Metadata, Viewport } from "next"
import { env } from "@/env.mjs"
import { Analytics } from "@vercel/analytics/react"

import { fontInter, fontJetBrainsMono } from "@/config/fonts"
import { siteConfig } from "@/config/site"
import { SmoothScrollProvider } from "@/providers/smooth-scroll-provider"
import { ThemeProvider } from "@/providers/theme-provider"
import { cn } from "@/lib/utils"
import { Toaster } from "@/components/ui/toaster"
import { TailwindIndicator } from "@/components/tailwind-indicator"

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
}

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: {
    default: siteConfig.nameLong,
    template: `%s - ${siteConfig.nameLong}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [
    {
      name: "Piotr Borowiecki",
      url: "https://pjborowiecki.com",
    },
  ],
  creator: "@pjborowiecki",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.nameLong,
    description: siteConfig.description,
    siteName: siteConfig.nameLong,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.nameLong,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: siteConfig.author,
  },
  icons: {
    icon: "/favicon.ico",
  },
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps): JSX.Element {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontInter.variable,
          fontJetBrainsMono.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <SmoothScrollProvider>
            {children}
            <Toaster />
            <Analytics />
            <TailwindIndicator />
          </SmoothScrollProvider>
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  )
}
