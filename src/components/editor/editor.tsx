"use client"

import "highlight.js/styles/stackoverflow-dark.css"

import React from "react"
import { type Editor as TiptapEditor } from "@tiptap/core"
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight"
import Image from "@tiptap/extension-image"
import Link from "@tiptap/extension-link"
import Underline from "@tiptap/extension-underline"
import { EditorContent, useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import { atom, useSetAtom } from "jotai"
import { common, createLowlight } from "lowlight"

import { BubbleMenu } from "./bubble-menu"
import { FloatingMenu } from "./floating-menu"

export const editorAtom = atom<TiptapEditor | null>(null)

type EditorProps = {
  body?: unknown
}

export const Editor = ({ body }: EditorProps) => {
  const setEditor = useSetAtom(editorAtom)
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
        class: "prose dark:prose-invert focus:outline-none",
      },
    },
    autofocus: true,
    onCreate: ({ editor }) => {
      setEditor(editor)
    },
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
