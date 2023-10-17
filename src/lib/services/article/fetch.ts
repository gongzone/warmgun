import { cache } from "react"
import { Prisma } from "@prisma/client"

import { db } from "@/lib/db"

export const articleDisplayArgs = Prisma.validator<Prisma.ArticleDefaultArgs>()(
  {
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
  }
)

export const articleDetailArgs = Prisma.validator<Prisma.ArticleDefaultArgs>()({
  select: {
    id: true,
    title: true,
    body: true,
    excerpt: true,
    thumbnail: true,
    slug: true,
    readingTime: true,
    picked: true,
    createdAt: true,
    updatedAt: true,
    user: {
      include: {
        profile: true,
        _count: { select: { articles: true, followees: true } },
      },
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

export type ArticleDisplay = Prisma.ArticleGetPayload<typeof articleDisplayArgs>
export type ArticleDetail = Prisma.ArticleGetPayload<typeof articleDetailArgs>

type FetchArticlesOptions = {
  filter?: "recent" | "trending" | "picked"
  take?: number
}

export const fetchArticles = cache(
  async ({ filter = "recent", take = 12 }: FetchArticlesOptions) => {
    const articles = await db.article.findMany({
      take,
      where: filter === "picked" ? { picked: true } : {},
      select: articleDisplayArgs.select,
      orderBy:
        filter === "trending"
          ? { trendingScore: "desc" }
          : { createdAt: "desc" },
    })

    return articles
  }
)

export const fetchOneArticle = async (slug: string) => {
  const article = await db.article.findUnique({
    where: { slug },
    select: articleDetailArgs.select,
  })

  return article
}
