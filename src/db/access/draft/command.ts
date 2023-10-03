import { db } from "@/db"
import { draft, type NewDraft } from "@/db/schema"
import { sql } from "drizzle-orm"

export const createDraft = async (userId: string) => {
  return await db
    .insert(draft)
    .values({
      authorId: userId,
    })
    .returning()
}

export const updateDraft = async (draftId: number, data: NewDraft) => {
  return (
    await db
      .update(draft)
      .set(data)
      .where(sql`${draft.id} = ${draftId}`)
      .returning()
  )[0]
}

export const deleteDraft = async (draftId: number) => {
  return (
    await db
      .delete(draft)
      .where(sql`${draft.id} = ${draftId}`)
      .returning()
  )[0]
}
