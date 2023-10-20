import { getServerSession } from "@/lib/auth"
import { TextWithIcon } from "@/components/@ui/text-with-icon"

import { CommentWriting } from "./comment-writing"
import { Comments } from "./comments"

export type CommentAreaProps = {
  articleId: number
  commentCount: number
}

export const CommentArea = async ({
  articleId,
  commentCount,
}: CommentAreaProps) => {
  const session = await getServerSession()

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
      <Comments user={session?.user} articleId={articleId} />
    </div>
  )
}
