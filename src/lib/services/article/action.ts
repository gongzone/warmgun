"use server"

import { db } from "@/db"
import { article, articleToTag, tag } from "@/db/schema"

import { getServerSession } from "@/lib/auth"
import {
  formatArticleSlug,
  formatExcerpt,
  formatReadingTime,
  formatTagSlug,
} from "@/lib/format"

type CreateArticleData = {
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
}: CreateArticleData) => {
  const session = await getServerSession("POST")

  if (!session?.user) {
    return // TODO: send 401 error or redirect login page
  }

  if (!title) {
    return
  }

  if (!text) {
    return
  }

  const slug = formatArticleSlug(title)
  const excerpt = formatExcerpt(text)
  const readingTime = formatReadingTime(text)

  await db.transaction(async (tx) => {
    const newArticle = (
      await tx
        .insert(article)
        .values({
          title,
          body,
          thumbnail,
          excerpt,
          slug,
          readingTime,
          authorId: session.user.userId,
        })
        .returning({ id: article.id })
    )[0]

    if (tags) {
      const newTags = await tx
        .insert(tag)
        .values(tags.map((tag) => ({ name: tag, slug: formatTagSlug(tag) })))
        .onConflictDoNothing({ target: tag.name })
        .returning({ id: tag.id })

      await tx
        .insert(articleToTag)
        .values(newTags.map((t) => ({ articleId: newArticle.id, tagId: t.id })))
    }
  })

  // TODO: Redirect To Article Page
}
