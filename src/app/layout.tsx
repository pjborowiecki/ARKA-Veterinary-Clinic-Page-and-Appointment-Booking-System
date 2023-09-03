import type { Metadata } from "next"
import { env } from "@/env.mjs"
import { ClerkProvider } from "@clerk/nextjs"

import { Toaster } from "@/components/ui/toaster"
import { ThemeProvider } from "@/components/providers/theme-provider"

import "@/styles/globals.css"

import { siteConfig } from "@/config/site"
import { fontInter, fontJetBrainsMono } from "@/lib/fonts"
import { cn } from "@/lib/utils"

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: {
    default: siteConfig.nameLong,
    template: `%s - ${siteConfig.nameLong}`,
  },
  description: siteConfig.description,
  keywords: [
    "Przychodnia weterynaryjna",
    "Weterynarz",
    "Weterynaria",
    "Weterynaria Bochnia",
    "Weterynaria Brzesko",
    "Weterynaria Małopolska",
    "ARKA",
    "Piotr Surma",
  ],
  authors: [
    {
      name: "Piotr Borowiecki",
      url: "https://pjborowiecki.com",
    },
  ],
  creator: "@pjborowiecki",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  openGraph: {},
  twitter: {
    card: "summary_large_image",
    title: siteConfig.nameLong,
    description: siteConfig.description,
    images: [`${siteConfig.url}/og.jpg`],
    creator: "@pjborowiecki",
  },
  icons: {
    icon: "/favicon.ico",
  },
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <ClerkProvider>
      <html
        lang="en"
        // suppressHydrationWarning={true}
      >
        <head />
        <body
          className={cn(
            "min-h-screen bg-background font-sans antialiased",
            fontInter.variable,
            fontJetBrainsMono.variable
          )}
        >
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            {children}
          </ThemeProvider>
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  )
}
