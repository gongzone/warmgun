"use client"

import React from "react"
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight"
import Link from "@tiptap/extension-link"
import Underline from "@tiptap/extension-underline"
import { EditorContent, EditorOptions, useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import { common, createLowlight } from "lowlight"

import { CommentEditorMenu } from "./comment-editor-menu"

type CommentEditorProps = {
  text?: unknown
} & Partial<EditorOptions>

export const CommentEditor = ({ text, ...props }: CommentEditorProps) => {
  const editor = useEditor({
    content: text ?? ``,
    extensions: [
      StarterKit.configure({
        codeBlock: false,
      }),
      Underline,
      Link,
      CodeBlockLowlight.configure({
        lowlight: createLowlight(common),
        HTMLAttributes: {
          class: "hljs",
        },
      }),
    ],
    editorProps: {
      attributes: {
        class:
          "prose prose-a:cursor-pointer prose-a:no-underline prose-a:text-blue-600 hover:prose-a:underline dark:prose-invert focus:outline-none",
      },
    },
    autofocus: false,
    ...props,
  })

  if (!editor) {
    return null
  }

  return (
    <div className="border">
      {!props.editable ? <CommentEditorMenu editor={editor} /> : null}
      <div className="min-h-[125px] p-3">
        <EditorContent editor={editor} />
      </div>
    </div>
  )
}
