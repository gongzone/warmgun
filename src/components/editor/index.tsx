"use client"

import "highlight.js/styles/stackoverflow-dark.css"

import React, { createContext, useContext } from "react"
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight"
import Image from "@tiptap/extension-image"
import Link from "@tiptap/extension-link"
import Underline from "@tiptap/extension-underline"
import {
  EditorContent,
  useEditor,
  type Editor as TiptapEditor,
} from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import { common, createLowlight } from "lowlight"

import { BubbleMenu } from "./bubble-menu"
import { FloatingMenu } from "./floating-menu"

export type EditorContextValue = {
  editor: TiptapEditor | null
}

export const EditorContext = createContext<EditorContextValue>({
  editor: null,
})

export const EditorConsumer = EditorContext.Consumer

export const useCurrentEditor = () => useContext(EditorContext)

type EditorProviderProps = {
  children: React.ReactNode
  body?: unknown
}

export const EditorProvider = ({ children, body }: EditorProviderProps) => {
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
  })

  if (!editor) {
    return null
  }

  return (
    <EditorContext.Provider value={{ editor }}>
      {children}
    </EditorContext.Provider>
  )
}

export const Editor = () => {
  return (
    <>
      <EditorConsumer>
        {({ editor: currentEditor }) => (
          <>
            <EditorContent editor={currentEditor} />
            <BubbleMenu editor={currentEditor} />
            <FloatingMenu editor={currentEditor} />
          </>
        )}
      </EditorConsumer>
    </>
  )
}
