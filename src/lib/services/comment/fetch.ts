"use server"

import { cache } from "react"

import { db } from "@/lib/db"

import { commentDisplayArgs, type FetchCommentsParams } from "./types"

export const fetchComments = cache(
  async ({
    articleId,
    parentCommentId,
    take = 10,
    cursor = null,
  }: FetchCommentsParams) => {
    const comments = await db.articleComment.findMany({
      take,
      skip: cursor ? 1 : 0,
      cursor: cursor
        ? {
            id: cursor,
          }
        : undefined,
      where: {
        AND: [{ articleId }, { parentCommentId }],
      },
      select: commentDisplayArgs.select,
      orderBy: { createdAt: "asc" },
    })

    return comments
  }
)
