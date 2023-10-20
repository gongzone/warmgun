import { formatDate } from "@/lib/format"
import { type CommentDisplay } from "@/lib/services/comment/types"
import { Avatar } from "@/components/@ui/avatar"
import { Text } from "@/components/@ui/text"
import { CommentEditor } from "@/components/editor/comment-editor"

import { Button } from "../@ui/button"
import { Icons } from "../@ui/icons"
import { TextWithIcon } from "../@ui/text-with-icon"
import { CommentWriting } from "./comment-writing"
import { CreateCommentForm } from "./create-comment-form"

type CommentItemProps = {
  comment: CommentDisplay
  // articleId: number
  // parentCommentId: number | null
}

export const CommentItem = ({ comment }: CommentItemProps) => {
  return (
    <div className="border-b pb-2 pt-4">
      <div className="flex flex-col">
        <div className="flex items-center gap-2">
          <Avatar src={comment.user.profile?.avatar} />
          <div className="flex flex-col">
            <Text weight={600}>{comment.user.profile?.displayName}</Text>
            <Text size="sm" weight={400} className="opacity-75">
              {formatDate(comment.createdAt, "fromNow")}
            </Text>
          </div>
        </div>
        <div className="mt-2">
          <div>
            <CommentEditor
              content={comment.content}
              editable={false}
              wrapperClassName="min-h-[0px] p-0"
            />
          </div>
          <div className="mt-2 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <Text size="sm">답글 쓰기</Text>
              {comment._count.childComments > 0 ? (
                <TextWithIcon
                  icon={(Icons) => <Icons.Comment className="h-4 w-4" />}
                  text={(Text) => (
                    <Text size="sm">
                      {comment._count.childComments ?? 0} 답글
                    </Text>
                  )}
                />
              ) : null}
            </div>
            <Button radius="full" size="xs">
              <Icons.Heart className="h-4 w-4" />
              {comment._count.likedBy}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
