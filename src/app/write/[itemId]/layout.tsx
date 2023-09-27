"use client"

import React from "react"
import { useSearchParams } from "next/navigation"

type WriteLayoutProps = {
  create: React.ReactNode
  edit: React.ReactNode
}

export default function WriteLayout({ create, edit }: WriteLayoutProps) {
  const searchParams = useSearchParams()
  const mode = searchParams.get("mode")

  if (!mode) {
    return // TODO: Add 404 error
  }

  return <>{mode === "create" ? create : edit}</>
}
