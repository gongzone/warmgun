"use client"

import { Editor } from "@/components/editor/editor"
import { TitleTextarea } from "@/components/editor/title-textarea"

import { useWriteContext } from "../_lib/store"

export const WriteEditor = () => {
  const title = useWriteContext((state) => state.title)
  const body = useWriteContext((state) => state.body)
  const updateTitle = useWriteContext((state) => state.updateTitle)
  const updateBody = useWriteContext((state) => state.updateBody)
  const updateText = useWriteContext((state) => state.updateText)

  return (
    <div className="space-y-4">
      <TitleTextarea title={title} setTitle={(title) => updateTitle(title)} />
      <Editor
        body={body}
        onCreate={({ editor }) => {
          updateBody(editor.getJSON())
          updateText(editor.getText({ blockSeparator: " " }))
        }}
        onUpdate={({ editor }) => {
          updateBody(editor.getJSON())
          updateText(editor.getText({ blockSeparator: " " }))
        }}
      />
    </div>
  )
}
