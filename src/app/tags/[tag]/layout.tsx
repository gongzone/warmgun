import React from "react"

import { fetchOneTag } from "@/lib/services/tag/fetch"
import { Container } from "@/components/@ui/container"
import { AppShell } from "@/components/app-shell"

import { TagTab } from "./_components/tag-tap"
import { TagTopArea } from "./_components/tag-top-area"

type TagLayoutProps = {
  children: React.ReactNode
  params: { tag: string }
}

export default async function TagLayout({ children, params }: TagLayoutProps) {
  const tagSlug = decodeURIComponent(params.tag)
  const tag = await fetchOneTag(tagSlug)

  if (!tag) {
    return
  }

  return (
    <AppShell>
      <Container variant="medium" className="py-20">
        <section>
          <TagTopArea tag={tag} />
        </section>

        <section className="mt-6">
          <TagTab />
        </section>

        <main>{children}</main>
      </Container>
    </AppShell>
  )
}
