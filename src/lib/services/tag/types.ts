import { Prisma } from "@prisma/client"

import { articleDisplayArgs } from "../article/types"

export const tagDisplayArgs = Prisma.validator<Prisma.ArticleTagDefaultArgs>()({
  select: {
    id: true,
    name: true,
    slug: true,
    createdAt: true,
  },
})

export const tagDetailArgs = Prisma.validator<Prisma.ArticleTagDefaultArgs>()({
  select: {
    id: true,
    name: true,
    slug: true,
    createdAt: true,
    _count: { select: { followedBy: true, articles: true } },
  },
})

export type TagDisplay = Prisma.ArticleTagGetPayload<typeof tagDisplayArgs>
export type TagDetail = Prisma.ArticleTagGetPayload<typeof tagDetailArgs>

export type FetchTagsOptions = {
  filter?: "recent" | "popular"
}
