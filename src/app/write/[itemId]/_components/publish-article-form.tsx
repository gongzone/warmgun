"use client"

import { createArticleAction } from "@/lib/services/article/action"
import { SubmitButton } from "@/components/@ui/submit-button"

import { useWriteContext } from "../_lib/store"

export const PublishArticleForm = () => {
  const title = useWriteContext((state) => state.title)
  const body = useWriteContext((state) => state.body)
  const text = useWriteContext((state) => state.text)
  const thumbnail = useWriteContext((state) => state.thumbnail)
  const tags = useWriteContext((state) => state.tags)

  const formAction = createArticleAction.bind(null, {
    title,
    body,
    text,
    thumbnail,
    tags,
  })

  return (
    <form action={formAction}>
      <SubmitButton variant="base" fullWidth>
        출간하기
      </SubmitButton>
    </form>
  )
}
