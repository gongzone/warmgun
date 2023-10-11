import { relations } from "drizzle-orm"
import {
  bigint,
  integer,
  pgEnum,
  pgTable,
  primaryKey,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core"

import { article } from "./article"
import { articleComment } from "./article-comment"
import { articleLike } from "./article-like"
import { draft } from "./draft"
import { userFollow } from "./user-follow"

export const roleEnum = pgEnum("role", ["USER", "ADMIN"])

export const user = pgTable("user", {
  id: varchar("id", { length: 15 }).primaryKey(),
  username: text("username").notNull(),
  email: text("email"),
  avatar: text("avatar"),
  role: roleEnum("role").default("USER").notNull(),
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { mode: "date" }).defaultNow().notNull(),
})

export const usersRelations = relations(user, ({ many }) => ({
  drafts: many(draft),
  articles: many(article),
  articleLikes: many(articleLike),
  articleComments: many(articleComment),
  followers: many(userFollow, { relationName: "follower" }),
  followees: many(userFollow, { relationName: "followee" }),
}))

export const session = pgTable("session", {
  id: varchar("id", { length: 128 }).primaryKey(),
  activeExpires: bigint("active_expires", { mode: "number" }).notNull(),
  idleExpires: bigint("idle_expires", { mode: "number" }).notNull(),
  userId: varchar("user_id", { length: 15 })
    .notNull()
    .references(() => user.id),
})

export const key = pgTable("key", {
  id: varchar("id", { length: 255 }).primaryKey(),
  hashedPassword: varchar("hashed_password", { length: 255 }),
  userId: varchar("user_id", { length: 15 })
    .notNull()
    .references(() => user.id),
})

export type User = typeof user.$inferSelect
export type NewUser = typeof user.$inferInsert
