import { cache } from "react"
import { Prisma } from "@prisma/client"

import { db } from "@/lib/db"

export const tagArgs = Prisma.validator<Prisma.ArticleTagDefaultArgs>()({
  select: {
    id: true,
    name: true,
    slug: true,
    createdAt: true,
  },
})

export type TagDisplay = Prisma.ArticleTagGetPayload<typeof tagArgs>

type FetchTagsOptions = {
  filter?: "recent" | "popular"
}

export const fetchTags = cache(
  async ({ filter = "recent" }: FetchTagsOptions) => {
    const tags = await db.articleTag.findMany({
      take: 12,
      orderBy:
        filter === "popular"
          ? { followedBy: { _count: "desc" } }
          : { createdAt: "desc" },
    })

    return tags
  }
)
