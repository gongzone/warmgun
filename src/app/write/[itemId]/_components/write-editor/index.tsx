import { Editor } from "@/components/editor"

import { TitleTextarea } from "./title-textarea"

export const WriteEditor = () => {
  return (
    <div className="space-y-2">
      <TitleTextarea />
      <Editor />
    </div>
  )
}
