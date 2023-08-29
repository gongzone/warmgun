import "../styles/globals.css"

import type { Metadata } from "next"

import { fonts } from "@/lib/fonts"
import { Shell } from "@/components/shell"

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${fonts.pretendard.variable} ${fonts.tenada.variable}`}>
        <Shell>{children}</Shell>
      </body>
    </html>
  )
}
