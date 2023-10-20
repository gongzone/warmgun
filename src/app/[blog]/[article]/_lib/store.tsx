"use client"

import React, { createContext, useContext, useRef } from "react"
import { createStore, useStore } from "zustand"

type CommentWritingProps = {
  content: unknown
  text: string | null
}

type CommentWritingState = {
  updateContent: (content: CommentWritingProps["content"]) => void
  updateText: (text: CommentWritingProps["text"]) => void
} & CommentWritingProps

type CommentWritingStore = ReturnType<typeof createCommentWritingStore>

const createCommentWritingStore = (
  initProps?: Partial<CommentWritingProps>
) => {
  const DEFAULT_PROPS = {
    content: null,
    text: null,
  } satisfies CommentWritingProps

  return createStore<CommentWritingState>()((set) => ({
    ...DEFAULT_PROPS,
    ...initProps,
    updateContent: (content) => set(() => ({ content: content })),
    updateText: (text) => set(() => ({ text: text })),
  }))
}

const CommentWritingContext = createContext<CommentWritingStore | null>(null)

type CommentWritingProviderProps = React.PropsWithChildren<
  Partial<CommentWritingProps>
>

export function useCommentWritingContext<T>(
  selector: (state: CommentWritingState) => T
): T {
  const store = useContext(CommentWritingContext)
  if (!store) throw new Error("Missing WriteContext.Provider in the tree")
  return useStore(store, selector)
}

export const CommentWritingProvider = ({
  children,
  ...props
}: CommentWritingProviderProps) => {
  const storeRef = useRef<CommentWritingStore>()
  if (!storeRef.current) {
    storeRef.current = createCommentWritingStore(props)
  }

  return (
    <CommentWritingContext.Provider value={storeRef.current}>
      {children}
    </CommentWritingContext.Provider>
  )
}
