"use client"

import { usePathname } from "next/navigation"

import { DefaultHeader } from "./default-header"

interface ShellProps {
  children: React.ReactNode
}

const Shell = ({ children }: ShellProps) => {
  const pathname = usePathname()

  return (
    <>
      {pathname === "/login" ? undefined : <DefaultHeader />}
      {children}
    </>
  )
}

export { Shell }
