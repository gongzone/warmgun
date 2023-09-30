"use client"

import "highlight.js/styles/stackoverflow-dark.css"

import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight"
import Image from "@tiptap/extension-image"
import Link from "@tiptap/extension-link"
import Underline from "@tiptap/extension-underline"
import { EditorContent, useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import { common, createLowlight } from "lowlight"

import { BubbleMenu } from "./bubble-menu"
import { FloatingMenu } from "./floating-menu"

export const Editor = () => {
  const lowlight = createLowlight(common)
  const editor = useEditor({
    content: `<pre class="hljs"><code class="language-javascript">for (var i=1; i <= 20; i++)
    {
      if (i % 15 == 0)
        console.log("FizzBuzz");
      else if (i % 3 == 0)
        console.log("Fizz");
      else if (i % 5 == 0)
        console.log("Buzz");
      else
        console.log(i);
    }</code></pre>`,
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      Underline,
      Link,
      CodeBlockLowlight.configure({
        lowlight,
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

  return (
    <>
      <EditorContent editor={editor} />
      {editor && <BubbleMenu editor={editor} />}
      {editor && <FloatingMenu editor={editor} />}
    </>
  )
}
