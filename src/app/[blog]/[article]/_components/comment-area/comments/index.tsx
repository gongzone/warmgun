import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query"

import { type SessionUser } from "@/lib/auth"
import { fetchComments } from "@/lib/services/comment/fetch"

import { CommentsClient } from "./comments-client"

type CommentsProps = {
  user: SessionUser | undefined
  articleId: number
}

export const Comments = async ({ user, articleId }: CommentsProps) => {
  const queryClient = new QueryClient()

  await queryClient.prefetchInfiniteQuery({
    queryKey: ["parent-comments"],
    queryFn: ({ pageParam }) =>
      fetchComments({
        articleId,
        parentCommentId: null,
        take: 10,
        cursor: pageParam,
      }),
    initialPageParam: null,
    getNextPageParam: (lastPage: any) => lastPage[lastPage.length - 1]?.id,
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CommentsClient user={user} articleId={articleId} />
    </HydrationBoundary>
  )
}
