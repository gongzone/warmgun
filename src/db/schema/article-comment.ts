import { relations } from "drizzle-orm"
import { integer, jsonb, pgTable, serial, text } from "drizzle-orm/pg-core"

import { article } from "./article"
import { user } from "./user"

export const articleComment = pgTable("article_comment", {
  id: serial("id").primaryKey(),
  content: jsonb("body").notNull(),
  userId: text("user_id"),
  articleId: integer("article_id"),
  parentId: integer("parent_id"),
})

export const articleCommentRelations = relations(
  articleComment,
  ({ one, many }) => ({
    user: one(user, { fields: [articleComment.userId], references: [user.id] }),
    article: one(article, {
      fields: [articleComment.articleId],
      references: [article.id],
    }),
    parent: one(articleComment, {
      fields: [articleComment.parentId],
      references: [articleComment.id],
    }),
    children: many(articleComment),
  })
)
