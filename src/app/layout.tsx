import "../styles/globals.css"

import React from "react"
import type { Metadata } from "next"

import { site } from "@/lib/constants/site"
import { fonts } from "@/lib/fonts"

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
        {children}
      </body>
    </html>
  )
}
