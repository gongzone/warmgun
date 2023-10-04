import { relations } from "drizzle-orm"
import { jsonb, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core"

import { user } from "./user"

export const draft = pgTable("draft", {
  id: serial("id").primaryKey(),
  title: text("title"),
  body: jsonb("body"),
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { mode: "date" }).defaultNow().notNull(),
  authorId: text("author_id"),
})

export const draftsRelations = relations(draft, ({ one }) => ({
  author: one(user, { fields: [draft.authorId], references: [user.id] }),
}))

export type Draft = typeof draft.$inferSelect
export type NewDraft = typeof draft.$inferInsert
