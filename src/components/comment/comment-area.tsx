import { getServerSession } from "@/lib/auth"
import { fetchComments } from "@/lib/services/comment/fetch"

import { Text } from "../@ui/text"
import { TextWithIcon } from "../@ui/text-with-icon"
import { CommentInfiniteScroll } from "./comment-infinite-scroll"
import { CommentItem } from "./comment-item"
import { CommentWriting } from "./comment-writing"

type CommentAreaProps = {
  articleId: number
  commentCount: number
}

export const CommentArea = async ({
  articleId,
  commentCount,
}: CommentAreaProps) => {
  const session = await getServerSession()
  const comments = await fetchComments({
    articleId,
    parentCommentId: null,
    take: 10,
    cursor: null,
  })

  return (
    <div>
      <div className="mb-8">
        <TextWithIcon
          icon={(Icons) => <Icons.Comment className="h-5 w-5" />}
          text={(Text) => (
            <Text size="lg" weight={600}>
              {commentCount}개의 댓글
            </Text>
          )}
        />
      </div>
      {session?.user ? (
        <CommentWriting
          user={session.user}
          articleId={articleId}
          parentCommentId={null}
        />
      ) : null}
      <div className="mt-10">
        <CommentInfiniteScroll
          init={comments}
          options={{ articleId, parentCommentId: null, take: 10 }}
        />
      </div>
    </div>
  )
}
