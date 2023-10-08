import { db } from "@/db"
import { article, type NewArticle } from "@/db/schema"

export const createArticle = async (userId: string, data: NewArticle) => {
  // const { title, body, thumbnail } = data
  // await db.transaction(async (tx) => {
  //   await tx.insert(article).values({
  //     title,
  //     body,
  //     thumbnail,
  //   })
  // })
}
