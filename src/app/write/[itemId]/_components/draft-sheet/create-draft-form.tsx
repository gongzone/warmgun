"use client"

//@ts-ignore
import { experimental_useFormState as useFormState } from "react-dom"

import { createDraftAction } from "@/lib/services/draft/action"
import { SubmitButton } from "@/components/@ui/submit-button"
import { useToast } from "@/components/@ui/use-toast"

export const CreateDraftForm = () => {
  const [state, formAction] = useFormState(createDraftAction, {
    type: null,
    message: null,
  })
  const { toast } = useToast()

  return (
    <form action={formAction}>
      <SubmitButton
        variant="base"
        type="submit"
        afterAction={() => {
          if (state.type) {
            toast({
              title: "Warmgun 글쓰기",
              description: state.message,
            })
          }
        }}
      >
        새 초고 만들기
      </SubmitButton>
    </form>
  )
}
