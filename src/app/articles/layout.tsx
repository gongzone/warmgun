import React from "react"

import { Button } from "@/components/@ui/button"
import { Container } from "@/components/@ui/container"
import { Text } from "@/components/@ui/text"
import { AppShell } from "@/components/app-shell"

import { ArticlesTab } from "./_component/articles-tap"

type ArticleLayoutProps = {
  children: React.ReactNode
}

export default function ArticlesLayout({ children }: ArticleLayoutProps) {
  return (
    <AppShell>
      <Container variant="medium" className="py-20">
        <div className="mb-6 flex items-center justify-between">
          <Text size="4xl" weight={700}>
            아티클 페이지
          </Text>
          <div className="flex items-center gap-3">
            <Button size="sm" radius="full">
              글 작성
            </Button>
            <Button size="sm" radius="full">
              나의 피드
            </Button>
          </div>
        </div>

        <div className="mb-4">
          <ArticlesTab />
        </div>
        {children}
      </Container>
    </AppShell>
  )
}
