"use client"

import { useParams } from "next/navigation"

import { useFormAction } from "@/lib/form-action/hook"
import { saveDraftAction } from "@/lib/services/draft/action"
import { SubmitButton } from "@/components/@ui/submit-button"
import { useToast } from "@/components/@ui/use-toast"

import { useWriteContext } from "../_lib/store"

export const SaveDraftForm = () => {
  const pageDraftId = Number(useParams().itemId)

  const title = useWriteContext((state) => state.title)
  const body = useWriteContext((state) => state.body)

  const { toast } = useToast()

  const { formAction } = useFormAction(
    saveDraftAction.bind(null, {
      draftId: pageDraftId,
      title,
      body,
    }),
    {
      onError: (state) => {
        toast({
          title: "초고 수정 중 문제가 발생하였습니다.",
          description: state.message,
        })
      },
      onSuccess: (state) => {
        toast({
          title: "Warmgun 초고 성공 메세지 🎉",
          description: state.message,
        })
      },
    }
  )

  return (
    <form action={formAction}>
      <SubmitButton radius="full" type="submit">
        저장
      </SubmitButton>
    </form>
  )
}
