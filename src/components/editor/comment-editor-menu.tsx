import { type Editor } from "@tiptap/react"

import { Toggle } from "@/components/@ui/toggle"

import { Icons } from "../@ui/icons"

type CommnetEditorMenuProps = {
  editor: Editor | null
}

export const CommentEditorMenu = ({ editor }: CommnetEditorMenuProps) => {
  if (!editor) {
    return null
  }

  return (
    <div className="flex gap-1 border-b p-1">
      <Toggle size="xs">
        <Icons.Bold className="h-4 w-4" />
      </Toggle>
      <Toggle size="xs">
        <Icons.Italic className="h-4 w-4" />
      </Toggle>
      <Toggle size="xs">
        <Icons.UnderLine className="h-4 w-4" />
      </Toggle>
      <Toggle size="xs">
        <Icons.Strike className="h-4 w-4" />
      </Toggle>
    </div>
  )
}
