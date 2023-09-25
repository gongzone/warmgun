import localFont from "next/font/local"

const pretendard = localFont({
  src: "./Pretendard-Variable.woff2",
  variable: "--font-pretendard",
  preload: true,
})

const tenada = localFont({
  src: "./Tenada.ttf",
  variable: "--font-tenada",
  weight: "400",
  preload: true,
})

export const fonts = { pretendard, tenada }
