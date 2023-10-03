"use client"

import { useParams } from "next/navigation"
//@ts-ignore
import { experimental_useFormState as useFormState } from "react-dom"

import { saveDraftAction } from "@/lib/services/draft/action"
import { SubmitButton } from "@/components/@ui/submit-button"
import { useToast } from "@/components/@ui/use-toast"
import { useCurrentEditor } from "@/components/editor"

import { useTitleTextarea } from "./title-textarea"

export const SaveDraftForm = () => {
  const pageDraftId = Number(useParams().itemId)
  const { editor } = useCurrentEditor()
  const { titleTextarea } = useTitleTextarea()
  const [state, formAction] = useFormState(
    saveDraftAction.bind(null, {
      draftId: pageDraftId,
      title: titleTextarea?.current?.value,
      body: editor?.getJSON(),
    }),
    { isSuccess: false, message: null }
  )
  const { toast } = useToast()

  return (
    <form action={formAction}>
      <SubmitButton
        radius="full"
        afterAction={() => {
          if (state.isSuccess) {
            toast({
              title: "Warmgun 글쓰기",
              description: state.message,
            })
          }
        }}
      >
        저장
      </SubmitButton>
    </form>
  )
}
