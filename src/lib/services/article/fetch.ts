import { cache } from "react"
import { db } from "@/db"
import { article } from "@/db/schema/article"
import { user } from "@/db/schema/user"
import { sql } from "drizzle-orm"

export const fetchPickedArticles = cache(async () => {
  const prepared = db
    .select()
    .from(article)
    .where(sql`${article.picked} = ${true}`)
    .innerJoin(user, sql`${article.authorId} = ${user.id}`)
    .prepare("fetch_picked_articles")

  return await prepared.execute()
})
