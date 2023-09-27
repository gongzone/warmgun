import {
  integer,
  jsonb,
  pgTable,
  primaryKey,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core"

export const draft = pgTable("draft", {
  id: serial("id").primaryKey(),
  title: text("title"),
  body: jsonb("body"),
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { mode: "date" }).defaultNow().notNull(),
  authorId: text("author_id"),
})
