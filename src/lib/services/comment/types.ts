import { Prisma } from "@prisma/client"

const commentSelect = {
  id: true,
  content: true,
  createdAt: true,
  updatedAt: true,
  userId: true,
  articleId: true,
  parentCommentId: true,
  user: {
    include: { profile: true },
  },
  _count: {
    select: {
      likedBy: true,
      childComments: true,
    },
  },
} satisfies Prisma.ArticleCommentSelect

export const commentDisplayArgs =
  Prisma.validator<Prisma.ArticleCommentDefaultArgs>()({
    select: {
      ...commentSelect,
    },
  })

export type CommentDisplay = Prisma.ArticleCommentGetPayload<
  typeof commentDisplayArgs
>

export type FetchCommentsParams = {
  articleId: number
  parentCommentId: number | null
  take?: number
  cursor?: number | null
}
