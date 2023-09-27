import { db } from "@/db"
import { sql } from "drizzle-orm"

export const findDrafts = async (userId: string) => {
  const prepared = db.query.draft
    .findMany({
      where: (draft, { eq }) => eq(draft.authorId, sql.placeholder("userId")),
      orderBy: (draft, { desc }) => [desc(draft.updatedAt)],
    })
    .prepare("get_drafts")

  return await prepared.execute({ userId })
}
