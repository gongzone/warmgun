"use client"

import { useFormAction } from "@/lib/form-action/hook"
import { createDraftAction } from "@/lib/services/draft/action"
import { SubmitButton } from "@/components/@ui/submit-button"
import { useToast } from "@/components/@ui/use-toast"

export const CreateDraftForm = () => {
  const { toast } = useToast()
  const { formAction } = useFormAction(createDraftAction, {
    onError: (state) => {
      toast({
        title: "초고 생성 중 문제가 발생하였습니다.",
        description: state.message,
      })
    },
  })

  return (
    <form action={formAction}>
      <SubmitButton variant="base" type="submit">
        새 초고 만들기
      </SubmitButton>
    </form>
  )
}
