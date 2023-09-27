import { db } from "@/db"
import { draft } from "@/db/schema"

function createDraft(userId: string) {
  return db.insert(draft).values({
    authorId: userId,
  })
}
