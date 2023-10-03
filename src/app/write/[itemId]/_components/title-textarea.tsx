"use client"

import { createContext, useContext, useRef, type RefObject } from "react"
import TextareaAutosize from "react-textarea-autosize"

type TitleTextareaProps = {
  title?: string | null
}

const TitleTextareaContext = createContext<{
  titleTextarea: RefObject<HTMLTextAreaElement> | null
}>({
  titleTextarea: null,
})

export const useTitleTextarea = () => useContext(TitleTextareaContext)

export type TitleTextareaProviderProps = {
  children: React.ReactNode
}

export const TitleTextareaProvider = ({
  children,
}: TitleTextareaProviderProps) => {
  const titleTextarea = useRef<HTMLTextAreaElement>(null)

  return (
    <TitleTextareaContext.Provider value={{ titleTextarea }}>
      {children}
    </TitleTextareaContext.Provider>
  )
}

export const TitleTextarea = ({ title }: TitleTextareaProps) => {
  return (
    <TitleTextareaContext.Consumer>
      {({ titleTextarea }) => (
        <TextareaAutosize
          ref={titleTextarea}
          name="title"
          placeholder="제목을 입력하세요"
          className="w-full resize-none border-b bg-background pb-1.5 text-4xl font-bold focus:outline-none focus:ring-0"
          defaultValue={title ?? ""}
        />
      )}
    </TitleTextareaContext.Consumer>
  )
}
