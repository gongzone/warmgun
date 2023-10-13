import { relations } from "drizzle-orm"
import {
  boolean,
  integer,
  jsonb,
  pgTable,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core"

import { articleComment } from "./article-comment"
import { articleLike } from "./article-like"
import { articleToTag } from "./article-to-tag"
import { user, type User } from "./user"

export const article = pgTable("article", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  body: jsonb("body").notNull(),
  excerpt: text("excerpt").notNull(),
  thumbnail: text("thumbnail"),
  slug: text("slug").unique().notNull(),
  readingTime: integer("reading_time").default(0).notNull(),
  trendingScore: integer("trending_score").default(0).notNull(),
  picked: boolean("picked").default(false),
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { mode: "date" }).defaultNow().notNull(),
  authorId: text("author_id"),
})

export const articleRelations = relations(article, ({ one, many }) => ({
  author: one(user, { fields: [article.authorId], references: [user.id] }),
  likes: many(articleLike),
  comments: many(articleComment),
  articleToTag: many(articleToTag, { relationName: "tag" }),
}))

export type Article = typeof article.$inferSelect
export type NewArticle = typeof article.$inferInsert
