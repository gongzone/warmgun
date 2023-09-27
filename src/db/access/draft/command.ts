import { db } from "@/db"
import { drafts } from "@/db/schema"

function createDraft(userId: string) {
  return db.insert(drafts).values({
    authorId: userId,
  })
}
