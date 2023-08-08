import { DefaultHeader } from "@/components/Layout/_DefaultHeader/DefaultHeader"

interface LayoutProps {
  children: React.ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <DefaultHeader />
      {children}
    </>
  )
}

export { Layout }
