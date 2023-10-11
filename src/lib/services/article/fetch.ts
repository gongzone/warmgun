import { cache } from "react"
import { db } from "@/db"

export const fetchPickedArticles = cache(async () => {
  const prepared = db.query.article
    .findMany({
      limit: 12,
      where: (article, { eq }) => eq(article.picked, true),
      with: {
        author: true,
      },
      orderBy: (article, { desc }) => [desc(article.createdAt)],
    })
    .prepare("fetch_picked_articles")

  return await prepared.execute()
})
