import { cache } from "react"

import { db } from "@/lib/db"

import { FetchTagsOptions, tagDetailArgs, tagDisplayArgs } from "./types"

export const fetchTags = cache(
  async ({ filter = "recent" }: FetchTagsOptions) => {
    const tags = await db.articleTag.findMany({
      take: 12,
      select: tagDisplayArgs.select,
      orderBy:
        filter === "popular"
          ? { followedBy: { _count: "desc" } }
          : { createdAt: "desc" },
    })

    return tags
  }
)

export const fetchOneTag = cache(async (slug: string) => {
  const tag = await db.articleTag.findUnique({
    where: { slug },
    select: tagDetailArgs.select,
  })

  return tag
})
