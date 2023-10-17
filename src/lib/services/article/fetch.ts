import { cache } from "react"
import { Prisma } from "@prisma/client"

import { db } from "@/lib/db"

export const articleArgs = Prisma.validator<Prisma.ArticleDefaultArgs>()({
  select: {
    id: true,
    title: true,
    excerpt: true,
    thumbnail: true,
    slug: true,
    readingTime: true,
    picked: true,
    createdAt: true,
    updatedAt: true,
    user: {
      include: { profile: true },
    },
    tags: true,
    _count: {
      select: {
        likedBy: true,
        comments: true,
      },
    },
  },
})

export type ArticleDisplay = Prisma.ArticleGetPayload<typeof articleArgs>

type FetchArticlesOptions = {
  filter?: "recent" | "trending" | "picked"
}

export const fetchArticles = cache(
  async ({ filter = "recent" }: FetchArticlesOptions) => {
    const pickedArticles = await db.article.findMany({
      take: 12,
      where: filter === "picked" ? { picked: true } : {},
      select: articleArgs.select,
      orderBy:
        filter === "trending"
          ? { trendingScore: "desc" }
          : { createdAt: "desc" },
    })

    return pickedArticles
  }
)
