"use client"

import { useState } from "react"

import { SessionUser } from "@/lib/auth"
import { formatDate } from "@/lib/format"
import { type CommentDisplay } from "@/lib/services/comment/types"
import { Avatar } from "@/components/@ui/avatar"
import { Button } from "@/components/@ui/button"
import { Icons } from "@/components/@ui/icons"
import { Text } from "@/components/@ui/text"
import { TextWithIcon } from "@/components/@ui/text-with-icon"
import { CommentEditor } from "@/components/editor/comment-editor"

import { ChildComments } from "../child-comments"
import { CommentWriting } from "../comment-writing"

type CommentItemProps = {
  user: SessionUser | undefined
  comment: CommentDisplay
}

export const CommentItem = ({ user, comment }: CommentItemProps) => {
  const [isWritingOpen, setIsWritingOpen] = useState(false)
  const [isChildOpen, setIsChildOpen] = useState(false)

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
          <div className="mt-2 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <button
                className="text-sm transition-opacity hover:opacity-80"
                onClick={() => setIsWritingOpen(!isWritingOpen)}
              >
                답글 쓰기
              </button>
              {comment._count.childComments > 0 ? (
                <button onClick={() => setIsChildOpen(!isChildOpen)}>
                  <TextWithIcon
                    icon={(Icons) => <Icons.Comment className="h-4 w-4" />}
                    text={(Text) => (
                      <Text
                        size="sm"
                        className="transition-opacity hover:opacity-80"
                      >
                        {!isChildOpen
                          ? `${comment._count.childComments} 답글`
                          : "답글 접기"}
                      </Text>
                    )}
                  />
                </button>
              ) : null}
            </div>
            <Button radius="full" size="xs">
              <Icons.Heart className="h-4 w-4" />
              {comment._count.likedBy}
            </Button>
          </div>
        </div>
      </div>

      {isWritingOpen ? (
        <div className="border-l p-6 ">
          <CommentWriting
            user={user}
            articleId={comment.articleId}
            parentCommnetId={comment.id}
          />
        </div>
      ) : null}

      {isChildOpen ? (
        <div className="border-l p-6 ">
          <ChildComments
            articleId={comment.articleId}
            parentCommentId={comment.id}
          />
        </div>
      ) : null}
    </div>
  )
}
