import { Prisma } from "@prisma/client"

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

export type FetchArticlesOptions = {
  filter?: "recent" | "trending" | "best" | "picked"
  take?: number
  cursor?: number | null
}
