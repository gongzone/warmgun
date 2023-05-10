import { SiteHeader } from "@/components/Header/SiteHeader/SiteHeader"

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <SiteHeader />
      {children}
    </>
  )
}
