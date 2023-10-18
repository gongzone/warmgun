import { type User } from "lucia"

import { Avatar } from "@/components/@ui/avatar"
import { Text } from "@/components/@ui/text"
import { CommentEditor } from "@/components/editor/comment-editor"

type CommentWritingProps = {
  user: User
}

export const CommentWriting = ({ user }: CommentWritingProps) => {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <Avatar src={user.profile?.avatar} alt={user.profile?.displayName} />
        <Text weight={500}>{user.profile?.displayName}</Text>
      </div>
      <CommentEditor />
    </div>
  )
}
