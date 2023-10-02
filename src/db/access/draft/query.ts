import { db } from "@/db"
import { draft } from "@/db/schema/draft"
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

export const findDraftsCount = async (userId: string) => {
  const prepared = db
    .select({ count: sql<number>`count(*)` })
    .from(draft)
    .where(sql`${draft.authorId} = ${sql.placeholder("userId")}`)
    .prepare("find_drafts_count")

  return (await prepared.execute({ userId }))[0].count
}

export const findOneLatestDraft = async (userId: string) => {
  const prepared = db
    .select()
    .from(draft)
    .where(sql`${draft.authorId} = ${sql.placeholder("userId")}`)
    .limit(1)
    .orderBy(sql`updated_at desc`)
    .prepare("find_latest_draft")

  return (await prepared.execute({ userId }))[0]
}
