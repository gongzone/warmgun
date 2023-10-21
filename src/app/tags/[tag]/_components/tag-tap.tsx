"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { Tabs, TabsList, TabsTrigger } from "@/components/@ui/tabs"

export const TagTab = () => {
  const pathname = usePathname()
  const tagSlug = pathname.split("/")[2]
  const filter = pathname.split("/")[3]

  return (
    <Tabs defaultValue={filter ?? "trending"} className="w-[180px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="trending" asChild>
          <Link href={`/tags/${tagSlug}`}>트렌딩</Link>
        </TabsTrigger>
        <TabsTrigger value="recent" asChild>
          <Link href={`/tags/${tagSlug}/recent`}>최신순</Link>
        </TabsTrigger>
      </TabsList>
    </Tabs>
  )
}
