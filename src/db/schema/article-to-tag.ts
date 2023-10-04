import { relations } from "drizzle-orm"
import { integer, pgTable, primaryKey } from "drizzle-orm/pg-core"

import { article } from "./article"
import { tag } from "./tag"

export const articleToTag = pgTable(
  "article_to_tag",
  {
    articleId: integer("article_id")
      .notNull()
      .references(() => article.id, { onDelete: "cascade" }),
    tagId: integer("tag_id")
      .notNull()
      .references(() => tag.id, { onDelete: "cascade" }),
  },
  (t) => ({
    pk: primaryKey(t.articleId, t.tagId),
  })
)

export const articleToTagRelations = relations(articleToTag, ({ one }) => ({
  article: one(article, {
    fields: [articleToTag.articleId],
    references: [article.id],
    relationName: "article",
  }),
  tag: one(tag, {
    fields: [articleToTag.tagId],
    references: [tag.id],
    relationName: "tag",
  }),
}))
