"use client"

import React, { useEffect } from "react"
import { useInfiniteQuery } from "@tanstack/react-query"
import { Loader2 } from "lucide-react"
import { useInView } from "react-intersection-observer"

import { fetchArticles } from "@/lib/services/article/fetch"
import { type ArticleDisplay } from "@/lib/services/article/types"
import { ArticleListItem } from "@/components/article/article-list-item"

type TagArticlesProps = {
  filter: "recent" | "trending"
  tagSlug: string
}

export const TagArticles = ({ filter, tagSlug }: TagArticlesProps) => {
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: [`${filter}-articles`, { by: "tag-slug", key: tagSlug }],
    queryFn: ({ pageParam }) =>
      fetchArticles({
        where: { tags: { some: { slug: tagSlug } } },
        filter: filter,
        take: 10,
        cursor: pageParam,
      }),
    initialPageParam: null,
    getNextPageParam: (lastPage: any) => lastPage[lastPage.length - 1]?.id,
  })
  const [ref, inView] = useInView()

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage()
    }
  }, [inView, hasNextPage, isFetchingNextPage])

  return (
    <>
      {status === "success"
        ? data.pages.map((group, i) => (
            <React.Fragment key={i}>
              {group.map((article: ArticleDisplay) => (
                <React.Fragment key={article.id}>
                  <ArticleListItem article={article} />
                </React.Fragment>
              ))}
            </React.Fragment>
          ))
        : null}
      <div className="flex items-center justify-center p-6" ref={ref}>
        {isFetchingNextPage ? (
          <Loader2 className="h-6 w-6 animate-spin" />
        ) : null}
      </div>
    </>
  )
}
