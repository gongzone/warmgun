import { cache } from "react"
import { db } from "@/db"
import { articleComment, articleLike } from "@/db/schema"
import { sql } from "drizzle-orm"

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

export const fetchTrendingArticles = cache(async () => {
  await db.transaction(async (tx) => {
    const preparedTrendingArticles = tx.query.article
      .findMany({
        limit: 12,
        with: {
          author: true,
          articleToTag: {
            with: {
              tag: true,
            },
          },
        },
        orderBy: (article, { desc }) => [desc(article.trendingScore)],
      })
      .prepare("fetch_trending_articles")

    const preparedArticleLikeCount = tx
      .select({ count: sql<number>`count(*)`, articleId: articleLike.id })
      .from(articleLike)
      .groupBy(({ articleId }) => articleId)
      .where(sql`${articleLike.articleId} = ${sql.placeholder("articleId")}`)
      .prepare("fetch_article_like_count")
    const preparedArticleCommentCount = tx
      .select({ count: sql<number>`count(*)` })
      .from(articleComment)
      .where(sql`${articleComment.articleId} = ${sql.placeholder("articleId")}`)
      .prepare("fetch_article_comment_count")

    const trendingArticles = await preparedTrendingArticles.execute()
    const articleLikeCount = await preparedArticleLikeCount.execute({
      articleId: "",
    })
  })
})
