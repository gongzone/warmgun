import { db } from "@/db"
import { draft } from "@/db/schema"
import { sql } from "drizzle-orm"

export const createDraft = async (userId: string) => {
  return await db
    .insert(draft)
    .values({
      authorId: userId,
    })
    .returning()
}

export const deleteDraft = async (draftId: number) => {
  return (
    await db
      .delete(draft)
      .where(sql`${draft.id} = ${draftId}`)
      .returning()
  )[0]
}
