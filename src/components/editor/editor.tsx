"use client"

import "highlight.js/styles/stackoverflow-dark.css"

import React from "react"
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight"
import Image from "@tiptap/extension-image"
import Link from "@tiptap/extension-link"
import Underline from "@tiptap/extension-underline"
import { EditorContent, EditorOptions, useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import { common, createLowlight } from "lowlight"

import { BubbleMenu } from "./bubble-menu"
import { FloatingMenu } from "./floating-menu"

type EditorProps = {
  body?: unknown
} & Partial<Pick<EditorOptions, "onCreate" | "onUpdate" | "editable">>

export const Editor = ({ body, ...props }: EditorProps) => {
  const editor = useEditor({
    content: body ?? ``,
    extensions: [
      StarterKit.configure({
        codeBlock: false,
        heading: {
          levels: [1, 2, 3],
        },
      }),
      Underline,
      Link,
      CodeBlockLowlight.configure({
        lowlight: createLowlight(common),
        HTMLAttributes: {
          class: "hljs",
        },
      }),
      Image.configure({
        HTMLAttributes: {
          class: "mx-auto",
        },
      }),
    ],
    editorProps: {
      attributes: {
        class:
          "prose prose-a:cursor-pointer prose-a:no-underline prose-a:text-blue-600 hover:prose-a:underline dark:prose-invert focus:outline-none",
      },
    },
    autofocus: true,
    ...props,
  })

  if (!editor) {
    return null
  }

  return (
    <>
      <EditorContent editor={editor} />
      <BubbleMenu editor={editor} />
      <FloatingMenu editor={editor} />
    </>
  )
}
