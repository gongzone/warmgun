"use server"

import { revalidatePath } from "next/cache"
import { Prisma } from "@prisma/client"

import { getServerSession } from "@/lib/auth"
import { db } from "@/lib/db"
import { actionResponse, errorMessages } from "@/lib/form-action/utils"

type CreateCommentParams = {
  articleId: number
  parentCommentId: number | null
  content: unknown
  text: string | null
}

export const createComment = async ({
  articleId,
  parentCommentId,
  content,
  text,
}: CreateCommentParams) => {
  const session = await getServerSession("POST")

  if (!session?.user) {
    return actionResponse({
      type: "error",
      message: errorMessages.AUTHENTICATED_FAIL,
    })
  }

  if (!text || text.trim().length === 0) {
    return actionResponse({
      type: "error",
      message: "댓글을 입력해주세요.",
    })
  }

  const contentValue = content as Prisma.JsonObject

  await db.articleComment.create({
    data: {
      content: contentValue,
      parentCommentId: parentCommentId ? parentCommentId : undefined,
      userId: session.user.userId,
      articleId,
    },
  })

  revalidatePath("/[blog]/[article]", "page")

  return actionResponse({
    type: "success",
    message: "댓글 생성이 성공했습니다.",
  })
}
