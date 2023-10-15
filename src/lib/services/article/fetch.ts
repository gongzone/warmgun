import { cache } from "react"
import { Prisma } from "@prisma/client"

import { db } from "@/lib/db"

const articleInclude = Prisma.validator<Prisma.ArticleInclude>()({
  user: { include: { profile: true } },
  tags: true,
  _count: {
    select: {
      likedBy: true,
      comments: true,
    },
  },
})

export const fetchPickedArticles = cache(async () => {
  const pickedArticles = await db.article.findMany({
    take: 12,
    where: { picked: true },
    include: articleInclude,
    orderBy: { createdAt: "desc" },
  })

  return pickedArticles
})

export type PickedArticle = Prisma.PromiseReturnType<
  typeof fetchPickedArticles
>[0]

export const fetchTrendingArticles = cache(async () => {
  const trendingArticles = await db.article.findMany({
    take: 12,
    include: articleInclude,
    orderBy: { trendingScore: "desc" },
  })

  return trendingArticles
})

export type TrendingArticle = Prisma.PromiseReturnType<
  typeof fetchTrendingArticles
>[0]
