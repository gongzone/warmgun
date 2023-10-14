import { cache } from "react"
import { Prisma } from "@prisma/client"

import { db } from "@/lib/db"

export const fetchPickedArticles = cache(async () => {
  const pickedArticles = await db.article.findMany({
    take: 12,
    where: { picked: true },
    include: {
      user: { include: { profile: true } },
      _count: {
        select: {
          likedBy: true,
          comments: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  })

  return pickedArticles
})

export type PickedArticle = Prisma.PromiseReturnType<
  typeof fetchPickedArticles
>[0]
