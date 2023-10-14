import React from "react"

import { DefaultHeader } from "./default-header"

type AppShellProps = {
  header?: "default" | "none" | React.ReactNode
} & React.ComponentProps<"main">

export const AppShell = ({
  className,
  children,
  header = "default",
  ...props
}: AppShellProps) => {
  const HeaderComp =
    header === "default" ? <DefaultHeader /> : header === "none" ? null : header

  return (
    <>
      {HeaderComp}
      <main className={className} {...props}>
        {children}
      </main>
    </>
  )
}
