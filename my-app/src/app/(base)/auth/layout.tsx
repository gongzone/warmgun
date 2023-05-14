import React from "react"

import { AuthWrapper } from "./AuthWrapper"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="container py-6 md:py-20">
      <AuthWrapper>{children}</AuthWrapper>
    </div>
  )
}
