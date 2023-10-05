"use client"

import { useStore } from "@/lib/store"
import { Editor } from "@/components/editor/editor"
import { TitleTextarea } from "@/components/editor/title-textarea"

type WriteEditorProps = {
  title: string | null
  body: unknown
}

export const WriteEditor = ({ title, body }: WriteEditorProps) => {
  const updateTitle = useStore((state) => state.updateTitle)
  const updateBody = useStore((state) => state.updateBody)

  return (
    <div className="space-y-4">
      <TitleTextarea title={title} setTitle={(title) => updateTitle(title)} />
      <Editor body={body} setBody={(body) => updateBody(body)} />
    </div>
  )
}
