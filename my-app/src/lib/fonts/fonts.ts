import localFont from "next/font/local"

const pretendard = localFont({
  src: "./Pretendard-Variable.woff2",
  variable: "--font-pretendard",
  preload: true,
})

export const fonts = {
  pretendard,
}
