"use client"

import { useParams } from "next/navigation"

import { useFormAction } from "@/lib/form-action/hook"
import { deleteDraftAction } from "@/lib/services/draft/action"
import { SubmitButton } from "@/components/@ui/submit-button"
import { useToast } from "@/components/@ui/use-toast"

type DeleteDraftFormProps = {
  draftId: number
}

export const DeleteDraftForm = ({ draftId }: DeleteDraftFormProps) => {
  const pageDraftId = Number(useParams().itemId)
  const { toast } = useToast()
  const { formAction } = useFormAction(
    deleteDraftAction.bind(null, { draftId, pageDraftId }),
    {
      onError: (state) => {
        toast({
          title: "초고 삭제 중 문제가 발생하였습니다.",
          description: state.message,
        })
      },
    }
  )

  return (
    <form action={formAction}>
      <SubmitButton variant="base" type="submit">
        삭제하기
      </SubmitButton>
    </form>
  )
}
