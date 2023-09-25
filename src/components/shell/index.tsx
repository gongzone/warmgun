import { DefaultHeader } from "./default-header"

interface ShellProps {
  children: React.ReactNode
}

const Shell = ({ children }: ShellProps) => {
  return (
    <>
      <DefaultHeader />
      {children}
    </>
  )
}

export { Shell }
