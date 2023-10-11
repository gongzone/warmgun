"use client"

import { useParams } from "next/navigation"
//@ts-ignore
import { experimental_useFormState as useFormState } from "react-dom"

import { saveDraftAction } from "@/lib/services/draft/action"
import { SubmitButton } from "@/components/@ui/submit-button"
import { useToast } from "@/components/@ui/use-toast"

import { useWriteContext } from "../_lib/store"

export const SaveDraftForm = () => {
  const pageDraftId = Number(useParams().itemId)
  const title = useWriteContext((state) => state.title)
  const body = useWriteContext((state) => state.body)

  const formAction = saveDraftAction.bind(null, {
    draftId: pageDraftId,
    title,
    body,
  })

  // const { toast } = useToast()

  return (
    <form action={formAction}>
      <SubmitButton radius="full">저장</SubmitButton>
    </form>
  )
}