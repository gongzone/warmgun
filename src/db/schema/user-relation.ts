import { relations } from "drizzle-orm"

import { drafts } from "./draft"
import { users } from "./user"

export const usersRelations = relations(users, ({ many }) => ({
  drafts: many(drafts),
}))
