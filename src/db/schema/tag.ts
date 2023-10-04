import { relations } from "drizzle-orm"
import { integer, pgTable, serial, text } from "drizzle-orm/pg-core"

import { articleToTag } from "./article-to-tag"

export const tag = pgTable("tag", {
  id: serial("id").primaryKey(),
  name: text("name").unique().notNull(),
  slug: text("slug").unique().notNull(),
})

export const tagRelations = relations(tag, ({ many }) => ({
  articles: many(articleToTag, { relationName: "article" }),
}))
