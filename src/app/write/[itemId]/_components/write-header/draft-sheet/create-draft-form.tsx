"use client"

import {
  // @ts-ignore
  experimental_useFormState as useFormState,
  experimental_useFormStatus as useFormStatus,
} from "react-dom"

import { createDraftAction } from "@/lib/services/draft/action"
import { Button } from "@/components/@ui/button"

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <Button
      variant="base"
      type="submit"
      disabled={pending}
      aria-disabled={pending}
    >
      새 초고 만들기
    </Button>
  )
}

export const CreateDraftForm = () => {
  const [state, formAction] = useFormState(createDraftAction, {})

  return (
    <form action={formAction}>
      <SubmitButton />
    </form>
  )
}
