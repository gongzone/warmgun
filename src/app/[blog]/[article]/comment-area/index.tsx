import { getServerSession } from "@/lib/auth"
import { fetchComments } from "@/lib/services/comment/fetch"
import { TextWithIcon } from "@/components/@ui/text-with-icon"

import { CommentInfiniteList } from "./comment-infinite-list"
import { CommentWriting } from "./comment-writing"

export type CommentAreaProps = {
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
      <TextWithIcon
        icon={(Icons) => <Icons.Comment className="h-5 w-5" />}
        text={(Text) => (
          <Text size="lg" weight={600}>
            {commentCount}개의 댓글
          </Text>
        )}
        className="mb-8 flex"
      />
      <CommentWriting
        user={session?.user}
        articleId={articleId}
        parentCommnetId={null}
      />
      <div className="mt-6 ">
        <CommentInfiniteList
          init={comments}
          options={{ articleId, parentCommentId: null, take: 10 }}
        />
      </div>
    </div>
  )
}
