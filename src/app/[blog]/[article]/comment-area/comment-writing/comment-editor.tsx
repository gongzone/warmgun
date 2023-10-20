"use client"

import { CommentEditor as CommentEditorBase } from "@/components/editor/comment-editor"

import { useCommentWritingContext } from "../../../_lib/store"

export const CommentEditor = () => {
  const content = useCommentWritingContext((state) => state.content)
  const updateContent = useCommentWritingContext((state) => state.updateContent)
  const updateText = useCommentWritingContext((state) => state.updateText)

  return (
    <CommentEditorBase
      content={content}
      onUpdate={({ editor }) => {
        updateContent(JSON.parse(JSON.stringify(editor.getJSON())))
        updateText(editor.getText({ blockSeparator: " " }))
      }}
    />
  )
}
