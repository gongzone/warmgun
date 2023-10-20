"use client"

import { useFormAction } from "@/lib/form-action/hook"
import { createComment } from "@/lib/services/comment/action"
import { SubmitButton } from "@/components/@ui/submit-button"
import { useToast } from "@/components/@ui/use-toast"

type CreateCommentFormProps = {
  articleId: number
  content: unknown
  parentCommentId: number | null
  text: string | null
  onSuccess: () => void
}

export const CreateCommentForm = ({
  articleId,
  content,
  parentCommentId,
  onSuccess,
  text,
}: CreateCommentFormProps) => {
  const { toast } = useToast()
  const action = createComment.bind(null, {
    articleId,
    content,
    parentCommentId,
    text,
  })

  const { formAction } = useFormAction(action, {
    onError: (state) => {
      toast({
        title: "댓글 생성 중 문제가 발생하였습니다.",
        description: state.message,
      })
    },
    onSuccess: (state) => {
      toast({
        title: "Warmgun",
        description: state.message,
      })
      onSuccess()
    },
  })

  return (
    <form action={formAction}>
      <SubmitButton radius="full" type="submit" variant="base-ghost">
        댓글 달기
      </SubmitButton>
    </form>
  )
}
