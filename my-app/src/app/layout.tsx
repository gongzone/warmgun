import "@/styles/globals.css"
import { Metadata } from "next"

import { siteConfig } from "@/config/site"
import { fontHeading, fontSans } from "@/lib/fonts/fonts"
import { cn } from "@/lib/utils"
import { SiteFooter } from "@/components/Footer/SiteFooter"
import { SiteHeader } from "@/components/Header/SiteHeader/SiteHeader"

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
      <html lang="en" className="dark">
        <head />
        <body
          className={cn(
            "bg-background min-h-screen font-sans antialiased",
            fontSans.variable,
            fontHeading.variable
          )}
        >
          <SiteHeader />
          <div>{children}</div>
          <SiteFooter />
        </body>
      </html>
    </>
  )
}
