"use client"

import { useState } from "react"
import { type User } from "lucia"

import { Avatar } from "@/components/@ui/avatar"
import { Text } from "@/components/@ui/text"
import { CommentEditor } from "@/components/editor/comment-editor"

import { CreateCommentForm } from "./create-comment-form"

type CommentWritingProps = {
  user: User
  articleId: number
  parentCommentId: number | null
}

export const CommentWriting = ({
  user,
  articleId,
  parentCommentId,
}: CommentWritingProps) => {
  const [content, setContent] = useState<unknown>(null)
  const [text, setText] = useState<string | null>(null)

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <Avatar src={user.profile?.avatar} alt={user.profile?.displayName} />
        <Text weight={500}>{user.profile?.displayName}</Text>
      </div>
      <div className="border">
        <CommentEditor
          content={content}
          editable={true}
          onUpdate={({ editor }) => {
            setContent(JSON.parse(JSON.stringify(editor.getJSON())))
            setText(editor.getText({ blockSeparator: " " }))
          }}
        />
        <div className="flex justify-end p-6 pt-0">
          <CreateCommentForm
            articleId={articleId}
            parentCommentId={parentCommentId}
            content={content}
            text={text}
            onSuccess={() => {
              setContent(null)
              setText(null)
            }}
          />
        </div>
      </div>
    </div>
  )
}
