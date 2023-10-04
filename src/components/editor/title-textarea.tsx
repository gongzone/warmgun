"use client"

import { RefObject, useRef } from "react"
import { atom, useSetAtom } from "jotai"
import TextareaAutosize from "react-textarea-autosize"

export const titleTextareaAtom = atom<RefObject<HTMLTextAreaElement> | null>(
  null
)

type TitleTextareaProps = {
  title?: string | null
}

export const TitleTextarea = ({ title }: TitleTextareaProps) => {
  const setTitleTextarea = useSetAtom(titleTextareaAtom)
  const titleTextarea = useRef<HTMLTextAreaElement>(null)
  setTitleTextarea(titleTextarea)

  return (
    <TextareaAutosize
      ref={titleTextarea}
      name="title"
      placeholder="제목을 입력하세요"
      className="w-full resize-none border-b bg-background pb-1.5 text-4xl font-bold focus:outline-none focus:ring-0"
      defaultValue={title ?? ""}
    />
  )
}
