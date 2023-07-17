"use client"

import { useSelectedLayoutSegment } from "next/navigation"

import { DefaultHeader } from "./DefaultHeader"

interface LayoutProps {
  children: React.ReactNode
}

export const Layout = ({ children }: LayoutProps) => {
  const segment = useSelectedLayoutSegment()

  return (
    <>
      {segment === "" ? <div></div> : <DefaultHeader />}
      <div>{children}</div>
    </>
  )
}
