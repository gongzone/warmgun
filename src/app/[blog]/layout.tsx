import React from "react"

import { AppShell } from "@/components/app-shell"

import { BlogHeader } from "./_components/blog-header"

type BlogLayoutProps = {
  children: React.ReactNode
  params: { blog: string }
}

export default function BlogLayout({ children, params }: BlogLayoutProps) {
  return (
    <AppShell
      header={
        <BlogHeader blogerUsername={decodeURIComponent(params.blog).slice(1)} />
      }
    >
      {children}
    </AppShell>
  )
}
