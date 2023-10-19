"use client"

import { useCallback, useEffect, useState, useTransition } from "react"
import { Loader2 } from "lucide-react"
import { useInView } from "react-intersection-observer"

import { fetchArticles } from "@/lib/services/article/fetch"
import {
  type ArticleDisplay,
  type FetchArticlesOptions,
} from "@/lib/services/article/types"

import { ArticleListItem } from "./article-list-item"

type ArticleInfiniteScrollProps = {
  init: ArticleDisplay[]
  options: FetchArticlesOptions
}

export const ArticleInfiniteScroll = ({
  init,
  options,
}: ArticleInfiniteScrollProps) => {
  const [articles, setArticles] = useState(init)
  const [pending, startTransition] = useTransition()
  const [ref, inView] = useInView()

  const loadMoreArticles = useCallback(
    () =>
      startTransition(async () => {
        const cursor = articles[articles.length - 1].id
        const loadedArticles = await fetchArticles({
          filter: options.filter,
          take: options.take,
          cursor,
        })

        if (loadedArticles.length) {
          setArticles((prev) => [...prev, ...loadedArticles])
        }
      }),
    [articles]
  )

  useEffect(() => {
    if (inView) {
      loadMoreArticles()
    }
  }, [inView, loadMoreArticles])

  return (
    <>
      <ul>
        {articles.map((article) => (
          <li key={article.id}>
            <ArticleListItem article={article} />
          </li>
        ))}
      </ul>
      <div className="flex items-center justify-center p-6" ref={ref}>
        {pending ? <Loader2 className="h-6 w-6 animate-spin" /> : null}
      </div>
    </>
  )
}
