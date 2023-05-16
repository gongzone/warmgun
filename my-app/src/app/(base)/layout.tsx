import { SiteFooter } from "@/components/Footer/SiteFooter"
import { SiteHeader } from "@/components/Header/SiteHeader/SiteHeader"

export default function BaseLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <SiteHeader />
      {children}
      <SiteFooter />
    </>
  )
}