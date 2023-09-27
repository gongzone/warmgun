import { db } from "@/db"
import { draft } from "@/db/schema"

export const createDraft = async (userId: string) => {
  return await db
    .insert(draft)
    .values({
      authorId: userId,
    })
    .returning()
}
