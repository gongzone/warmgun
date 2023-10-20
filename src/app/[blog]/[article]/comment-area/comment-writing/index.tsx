import { type SessionUser } from "@/lib/auth"
import { CommentDisplay } from "@/lib/services/comment/types"
import { Avatar } from "@/components/@ui/avatar"
import { Text } from "@/components/@ui/text"

import { CommentWritingProvider } from "../../../_lib/store"
import { CommentEditor } from "./comment-editor"
import { CreateCommentForm } from "./create-comment-form"

type CommentWritingProps = {
  articleId: number
  parentCommnetId: number | null
  user: SessionUser | CommentDisplay["user"] | undefined
}

export const CommentWriting = ({
  articleId,
  parentCommnetId,
  user,
}: CommentWritingProps) => {
  if (!user) {
    return // TODO: login page link button
  }

  return (
    <CommentWritingProvider>
      <div className="flex items-center gap-2">
        <Avatar
          size="sm"
          src={user.profile?.avatar}
          alt={user.profile?.displayName}
        />
        <Text weight={600}>{user.profile?.displayName}</Text>
      </div>
      <div className="mt-4 border">
        <CommentEditor />
        <div className="flex justify-end p-4 pt-0">
          <CreateCommentForm
            articleId={articleId}
            parentCommentId={parentCommnetId}
          />
        </div>
      </div>
    </CommentWritingProvider>
  )
}
