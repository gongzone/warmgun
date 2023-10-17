"use server"

import { redirect } from "next/navigation"
import { Prisma } from "@prisma/client"

import { getServerSession } from "@/lib/auth"
import { db } from "@/lib/db"
import { actionResponse, errorMessages } from "@/lib/form-action/utils"
import {
  formatArticleSlug,
  formatExcerpt,
  formatReadingTime,
  formatTagSlug,
} from "@/lib/format"

type CreateArticleParams = {
  title: string | null
  body: unknown
  text: string | null
  thumbnail: string | null
  tags: string[] | null
}

export const createArticleAction = async ({
  title,
  body,
  text,
  thumbnail,
  tags,
}: CreateArticleParams) => {
  const session = await getServerSession("POST")

  if (!session?.user) {
    return actionResponse({
      type: "error",
      message: errorMessages.AUTHENTICATED_FAIL,
    })
  }

  if (!title || title.trim().length === 0) {
    return actionResponse({
      type: "error",
      message: "제목을 입력해주세요.",
    })
  }

  if (!text || text.trim().length === 0) {
    return actionResponse({
      type: "error",
      message: "본문을 입력해주세요.",
    })
  }

  if (!thumbnail) {
    return actionResponse({
      type: "error",
      message: "썸네일은 필수 사항입니다.",
    })
  }

  const bodyValue = body as Prisma.JsonObject
  const slug = formatArticleSlug(title)
  const excerpt = formatExcerpt(text)
  const readingTime = formatReadingTime(text)

  const newArticle = await db.article.create({
    data: {
      title,
      body: bodyValue,
      excerpt,
      thumbnail,
      slug,
      readingTime,
      tags: tags
        ? {
            connectOrCreate: tags.map((tag: string) => ({
              where: { name: tag },
              create: { name: tag, slug: formatTagSlug(tag) },
            })),
          }
        : {},
      userId: session.user.userId,
    },
  })

  redirect(`/@${session.user.username}/${encodeURI(newArticle.slug)}`)
}
