import { relations } from "drizzle-orm"

import { draft } from "./draft"
import { user } from "./user"

export const draftsRelations = relations(draft, ({ one }) => ({
  author: one(user, { fields: [draft.authorId], references: [user.id] }),
}))
