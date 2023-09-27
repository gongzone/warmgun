import { relations } from "drizzle-orm"

import { draft } from "./draft"
import { user } from "./user"

export const usersRelations = relations(user, ({ many }) => ({
  drafts: many(draft),
}))
