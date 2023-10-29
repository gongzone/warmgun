"use client"

import { useCallback, useEffect, useState, useTransition } from "react"
import { Loader2 } from "lucide-react"
import { useInView } from "react-intersection-observer"

import { fetchComments } from "@/lib/services/comment/fetch"
import {
  type CommentDisplay,
  type FetchCommentsParams,
} from "@/lib/services/comment/types"

import { CommentItem } from "./comment-item"

type CommentInfiniteScrollChildrenProps = {
  init: CommentDisplay[]
  options: FetchCommentsParams
}

export const CommentInfiniteScrollChildren = ({
  options,
}: CommentInfiniteScrollChildrenProps) => {
  const [comments, setComments] = useState(null)
  const [pending, startTransition] = useTransition()
  const [ref, inView] = useInView()

  const loadMoreComments = useCallback(
    () =>
      startTransition(async () => {
        const cursor = comments[comments.length - 1].id
        const loadedComments = await fetchComments({ ...options, cursor })

        if (loadedComments.length) {
          setComments((prev) => [...prev, ...loadedComments])
        }
      }),
    [comments]
  )

  useEffect(() => {
    if (inView) {
      loadMoreComments()
    }
  }, [inView, loadMoreComments])

  return (
    <>
      <ul>
        {comments.map((comment) => (
          <li key={comment.id}>
            <CommentItem comment={comment} />
          </li>
        ))}
      </ul>
      <div className="flex items-center justify-center p-6" ref={ref}>
        {pending ? <Loader2 className="h-6 w-6 animate-spin" /> : null}
      </div>
    </>
  )
}