import { relations } from "drizzle-orm"
import { integer, pgTable, serial, text } from "drizzle-orm/pg-core"

import { article } from "./article"
import { user } from "./user"

export const articleLike = pgTable("article_like", {
  id: serial("id").primaryKey(),
  userId: text("user_id"),
  articleId: integer("article_id"),
})

export const aritcleLikeRelations = relations(articleLike, ({ one }) => ({
  user: one(user, { fields: [articleLike.userId], references: [user.id] }),
  article: one(article, {
    fields: [articleLike.articleId],
    references: [article.id],
  }),
}))
