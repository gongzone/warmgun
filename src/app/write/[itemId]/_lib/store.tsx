"use client"

import React, { createContext, useContext, useRef } from "react"
import { createStore, useStore } from "zustand"

type WriteProps = {
  title: string | null
  body: unknown
  text: string | null
  thumbnail: string | null
  tags: string[] | null
}

type WriteState = {
  updateTitle: (title: WriteProps["title"]) => void
  updateBody: (body: WriteProps["body"]) => void
  updateText: (text: WriteProps["text"]) => void
  updateThumbnail: (thumbnail: WriteProps["thumbnail"]) => void
  updateTags: (tags: WriteProps["tags"]) => void
  addToTags: (tag: string) => void
  removeFromTags: (tag: string) => void
} & WriteProps

type WriteStore = ReturnType<typeof createWriteStore>

const createWriteStore = (initProps?: Partial<WriteProps>) => {
  const DEFAULT_PROPS = {
    title: null,
    body: null,
    text: null,
    thumbnail: null,
    tags: null,
  } satisfies WriteProps

  return createStore<WriteState>()((set) => ({
    ...DEFAULT_PROPS,
    ...initProps,
    updateTitle: (title) => set(() => ({ title: title })),
    updateBody: (body) => set(() => ({ body: body })),
    updateText: (text) => set(() => ({ text: text })),
    updateThumbnail: (thumbnail) => set(() => ({ thumbnail: thumbnail })),
    updateTags: (tags) => set(() => ({ tags: tags })),
    addToTags: (tag) =>
      set((state) => {
        if (!state.tags) {
          return { tags: [tag] }
        }

        return { tags: [...state.tags, tag] }
      }),
    removeFromTags: (tag) =>
      set((state) => {
        if (!state.tags) {
          return { tags: [] }
        }

        return { tags: state.tags.filter((t) => t !== tag) }
      }),
  }))
}

const WriteContext = createContext<WriteStore | null>(null)

type WriteProviderProps = React.PropsWithChildren<Partial<WriteProps>>

export function useWriteContext<T>(selector: (state: WriteState) => T): T {
  const store = useContext(WriteContext)
  if (!store) throw new Error("Missing WriteContext.Provider in the tree")
  return useStore(store, selector)
}

export const WriteProvider = ({ children, ...props }: WriteProviderProps) => {
  const storeRef = useRef<WriteStore>()
  if (!storeRef.current) {
    storeRef.current = createWriteStore(props)
  }

  return (
    <WriteContext.Provider value={storeRef.current}>
      {children}
    </WriteContext.Provider>
  )
}
