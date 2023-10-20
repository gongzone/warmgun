"use client"

import React, { useEffect } from "react"
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight"
import Link from "@tiptap/extension-link"
import Underline from "@tiptap/extension-underline"
import { EditorContent, EditorOptions, useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import { common, createLowlight } from "lowlight"

import { cn } from "@/lib/utils"

import { CommentEditorMenu } from "./comment-editor-menu"

type CommentEditorProps = {
  content?: unknown
  wrapperClassName?: string
} & Partial<Omit<EditorOptions, "content">>

export const CommentEditor = ({
  content,
  wrapperClassName = "",
  ...props
}: CommentEditorProps) => {
  const editor = useEditor({
    // content: content ?? ``,
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

  useEffect(() => {
    if (editor) {
      editor.commands.setContent(content ?? "")
    }
  }, [editor, content])

  if (!editor) {
    return null
  }

  return (
    <>
      {editor.isEditable ? <CommentEditorMenu editor={editor} /> : null}
      <div className={cn("min-h-[75px] p-3", wrapperClassName)}>
        <EditorContent editor={editor} />
      </div>
    </>
  )
}
