import { formatDate } from "@/lib/format"
import { type CommentDisplay } from "@/lib/services/comment/types"
import { Avatar } from "@/components/@ui/avatar"
import { Button } from "@/components/@ui/button"
import { Icons } from "@/components/@ui/icons"
import { Text } from "@/components/@ui/text"
import { CommentEditor } from "@/components/editor/comment-editor"

type ChildCommentItemProps = {
  comment: CommentDisplay
}

export const ChildCommentItem = ({ comment }: ChildCommentItemProps) => {
  return (
    <div className="border-b pb-2.5 pt-6">
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
          <div className="mt-2 flex items-center justify-start">
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
