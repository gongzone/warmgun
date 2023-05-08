import { JetBrains_Mono as FontMono } from "next/font/google"
import localFont from "next/font/local"

export const fontSans = localFont({
  src: "./NanumSquareNeo-Variable.ttf",
  variable: "--font-sans",
})

export const fontHeading = localFont({
  src: "./Tenada.ttf",
  variable: "--font-heading",
})

// export const fontSans = Hahmlet({
//   subsets: ["latin"],
//   variable: "--font-sans",
// })

export const fontMono = FontMono({
  subsets: ["latin"],
  variable: "--font-mono",
})
