import "../styles/globals.css"
import "highlight.js/styles/stackoverflow-dark.css"

import React from "react"
import type { Metadata } from "next"

import { site } from "@/lib/constants/site"
import { fonts } from "@/lib/fonts"
import { Toaster } from "@/components/@ui/toaster"
import { TanstackProvider } from "@/components/@util/tanstack-provider"

export const metadata: Metadata = {
  title: site.title,
  description: site.description,
}

type RootLayoutProps = {
  children: React.ReactNode
}

export default async function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="ko">
      <body className={`${fonts.pretendard.variable} ${fonts.tenada.variable}`}>
        <TanstackProvider>
          {children}
          <Toaster />
        </TanstackProvider>
      </body>
    </html>
  )
}
