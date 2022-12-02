import '../styles/output.css'
import { Noto_Sans_KR } from '@next/font/google'

import Header from '../components/Header'
import MobileNav from '../components/MobileNav'

const NotoSansKR = Noto_Sans_KR({
  variable: '--font-noto-sans-kr',
  weight: ['300', '400', '500', '700'],
  subsets: ['korean', 'latin'],
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={NotoSansKR.variable}>
      <head></head>
      <body>
        <Header />
        <MobileNav />
        {children}
      </body>
    </html>
  )
}
