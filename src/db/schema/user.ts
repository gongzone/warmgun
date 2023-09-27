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

export const roleEnum = pgEnum("role", ["USER", "ADMIN"])

export const user = pgTable("user", {
  id: varchar("id", { length: 15 }).primaryKey(),
  username: text("username").notNull(),
  email: text("email"),
  avatar: text("avatar"),
  role: roleEnum("role").notNull().default("USER"),
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { mode: "date" }).defaultNow().notNull(),
})

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
