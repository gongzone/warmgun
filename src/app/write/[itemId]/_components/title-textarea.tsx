"use client"

import TextareaAutosize from "react-textarea-autosize"

type TitleTextareaProps = {
  title?: string | null
}

export const TitleTextarea = ({ title }: TitleTextareaProps) => {
  return (
    <TextareaAutosize
      name="title"
      placeholder="제목을 입력하세요"
      className="w-full resize-none border-b bg-background pb-1.5 text-4xl font-bold focus:outline-none focus:ring-0"
      defaultValue={title ?? ""}
    />
  )
}
