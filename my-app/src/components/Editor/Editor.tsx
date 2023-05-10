"use client"

import { useEffect, useRef } from "react"
import "./editor.css"
import { editorTools } from "./editor-tools";
	import EditorJS, { type OutputData, type EditorConfig } from '@editorjs/editorjs';

export function Editor() {
  useEffect(() => {
    let editor: EditorJS | null = null;

    const editorConfig = {
			holder: 'editor',
			placeholder: '당신의 이야기를 들려주세요.',
			tools: editorTools,
			// onReady: () => {
			// 	isEditorReady = true;
			// }
		} satisfies EditorConfig;

		editor = new EditorJS(editorConfig);

    return () => {
      if(editor) editor.destroy()
    }
  }, [])

  return <div className="prose dark:prose-invert" id="editor"></div>
}
