"use server"

import { cache } from "react"

import { db } from "@/lib/db"

import {
  articleDetailArgs,
  articleDisplayArgs,
  type FetchArticlesOptions,
} from "./types"

export const fetchArticles = cache(
  async ({
    where = {},
    filter = "recent",
    take = 12,
    cursor = null,
  }: FetchArticlesOptions) => {
    const articles = await db.article.findMany({
      take,
      skip: cursor ? 1 : 0,
      cursor: cursor
        ? {
            id: cursor,
          }
        : undefined,
      where: filter === "picked" ? { ...where, picked: true } : { ...where },
      select: articleDisplayArgs.select,
      orderBy:
        filter === "trending"
          ? { trendingScore: "desc" }
          : filter === "best"
          ? { likedBy: { _count: "desc" } }
          : { createdAt: "desc" },
    })

    return articles
  }
)

export const fetchOneArticle = async (slug: string) => {
  const article = await db.article.findUnique({
    where: { slug },
    select: articleDetailArgs.select,
  })

  return article
}
