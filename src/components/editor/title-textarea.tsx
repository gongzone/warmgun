"use client"

import { useEffect, useState } from "react"
import TextareaAutosize from "react-textarea-autosize"

type TitleTextareaProps = {
  title?: string | null
  setTitle?: (title: string) => void
}

export const TitleTextarea = ({ title, setTitle }: TitleTextareaProps) => {
  const [titleState, setTitleState] = useState<string>("")

  useEffect(() => {
    if (title) {
      setTitleState(title)
    }
  }, [title])

  useEffect(() => {
    if (setTitle) {
      setTitle(titleState)
    }
  }, [titleState])

  return (
    <TextareaAutosize
      name="title"
      placeholder="제목을 입력하세요"
      className="w-full resize-none border-b bg-background pb-1.5 text-4xl font-bold focus:outline-none focus:ring-0"
      value={titleState}
      onChange={(e) => setTitleState(e.currentTarget.value)}
    />
  )
}
