import { relations } from "drizzle-orm"

import { drafts } from "./draft"
import { users } from "./user"

export const draftsRelations = relations(drafts, ({ one }) => ({
  author: one(users, { fields: [drafts.authorId], references: [users.id] }),
}))
