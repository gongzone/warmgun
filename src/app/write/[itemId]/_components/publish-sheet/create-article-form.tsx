"use client"

import { useFormAction } from "@/lib/form-action/hook"
import { createArticleAction } from "@/lib/services/article/action"
import { SubmitButton } from "@/components/@ui/submit-button"
import { useToast } from "@/components/@ui/use-toast"

import { useWriteContext } from "../../_lib/store"

export const CreateArticleForm = () => {
  const title = useWriteContext((state) => state.title)
  const body = useWriteContext((state) => state.body)
  const text = useWriteContext((state) => state.text)
  const thumbnail = useWriteContext((state) => state.thumbnail)
  const tags = useWriteContext((state) => state.tags)

  const { toast } = useToast()

  const { formAction } = useFormAction(
    createArticleAction.bind(null, {
      title,
      body,
      text,
      thumbnail,
      tags,
    }),
    {
      onError: (state) => {
        toast({
          title: "아티클 생성 중 문제가 발생하였습니다.",
          description: state.message,
        })
      },
    }
  )

  return (
    <form action={formAction}>
      <SubmitButton variant="base" fullWidth>
        아티클 출간하기
      </SubmitButton>
    </form>
  )
}
