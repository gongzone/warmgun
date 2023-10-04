"use client"

import React from "react"
import { atom, createStore, Provider } from "jotai"

import { editorAtom } from "@/components/editor/editor"
import { titleTextareaAtom } from "@/components/editor/title-textarea"

export type WriteAtomState = {
  title: string | null
  body: unknown
  thumbnail: string | null
  tags: string[] | null
  category: string | null
}

export const wrtieAtom = atom<WriteAtomState>((get) => {
  const titleValue = get(titleTextareaAtom)?.current?.value
  const bodyValue = get(editorAtom)?.getJSON()

  return {
    title: titleValue ? titleValue : null,
    body: bodyValue ? bodyValue : null,
    thumbnail: null,
    tags: null,
    category: null,
  }
})

const writeStore = createStore()

type WriteProviderProps = {
  children: React.ReactNode
}

export const WriteProvider = ({ children }: WriteProviderProps) => {
  return <Provider store={writeStore}>{children}</Provider>
}
