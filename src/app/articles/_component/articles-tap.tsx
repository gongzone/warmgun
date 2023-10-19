"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { Tabs, TabsList, TabsTrigger } from "@/components/@ui/tabs"

export const ArticlesTab = () => {
  const pathname = usePathname()

  return (
    <Tabs
      defaultValue={pathname.split("/")[2] ?? "recent"}
      className="w-[280px]"
    >
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="recent" asChild>
          <Link href="/articles">최신순</Link>
        </TabsTrigger>
        <TabsTrigger value="trending" asChild>
          <Link href="/articles/trending">트렌딩</Link>
        </TabsTrigger>
        <TabsTrigger value="best" asChild>
          <Link href="/articles/best">베스트</Link>
        </TabsTrigger>
        <TabsTrigger value="picked" asChild>
          <Link href="/articles/picked">픽</Link>
        </TabsTrigger>
      </TabsList>
    </Tabs>
  )
}
