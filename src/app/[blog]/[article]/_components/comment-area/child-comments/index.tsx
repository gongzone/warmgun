"use client"

import React, { useEffect } from "react"
import { useInfiniteQuery } from "@tanstack/react-query"
import { Loader2 } from "lucide-react"
import { useInView } from "react-intersection-observer"

import { fetchComments } from "@/lib/services/comment/fetch"
import { CommentDisplay } from "@/lib/services/comment/types"

import { ChildCommentItem } from "./child-comment-item"

type ChildCommentsProps = {
  articleId: number
  parentCommentId: number
}

export const ChildComments = ({
  articleId,
  parentCommentId,
}: ChildCommentsProps) => {
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["child-comments", parentCommentId],
    queryFn: ({ pageParam }) =>
      fetchComments({
        articleId,
        parentCommentId,
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
              {group.map((comment: CommentDisplay) => (
                <React.Fragment key={comment.id}>
                  <ChildCommentItem comment={comment} />
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
