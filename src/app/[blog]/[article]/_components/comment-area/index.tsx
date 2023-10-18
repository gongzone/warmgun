import { getServerSession } from "@/lib/auth"

import { CommentItem } from "./comment-item"
import { CommentWriting } from "./comment-writing"

export const CommentArea = async () => {
  const session = await getServerSession()

  return (
    <div>{session?.user ? <CommentWriting user={session.user} /> : null}</div>
  )
}
