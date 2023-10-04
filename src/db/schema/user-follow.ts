import { relations } from "drizzle-orm"
import { pgTable, primaryKey, text } from "drizzle-orm/pg-core"

import { user } from "./user"

export const userFollow = pgTable(
  "user_follow",
  {
    followerId: text("follower_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    followeeId: text("followee_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
  },
  (t) => ({
    pk: primaryKey(t.followerId, t.followeeId),
  })
)

export const userFollowRelations = relations(userFollow, ({ one }) => ({
  follower: one(user, {
    fields: [userFollow.followerId],
    references: [user.id],
    relationName: "follower",
  }),
  followee: one(user, {
    fields: [userFollow.followeeId],
    references: [user.id],
    relationName: "followee",
  }),
}))
