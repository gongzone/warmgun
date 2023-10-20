"use client"

import { useQueryClient } from "@tanstack/react-query"

import { useFormAction } from "@/lib/form-action/hook"
import { createComment } from "@/lib/services/comment/action"
import { SubmitButton } from "@/components/@ui/submit-button"
import { useToast } from "@/components/@ui/use-toast"

import { useCommentWritingContext } from "../../../_lib/store"

type CreateCommentFormProps = {
  articleId: number
  parentCommentId: number | null
}

export const CreateCommentForm = ({
  articleId,
  parentCommentId,
}: CreateCommentFormProps) => {
  const { toast } = useToast()
  const queryClient = useQueryClient()
  const content = useCommentWritingContext((state) => state.content)
  const text = useCommentWritingContext((state) => state.text)
  const updateContent = useCommentWritingContext((state) => state.updateContent)
  const updateText = useCommentWritingContext((state) => state.updateText)

  const action = createComment.bind(null, {
    articleId,
    parentCommentId,
    content,
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
      updateContent(null)
      updateText(null)
      queryClient.invalidateQueries({ queryKey: ["parent-comments"] })
      if (parentCommentId) {
        queryClient.invalidateQueries({
          queryKey: ["child-comments", parentCommentId],
        })
      }
    },
  })

  return (
    <form action={formAction}>
      <SubmitButton size="sm" radius="full" type="submit">
        댓글 달기
      </SubmitButton>
    </form>
  )
}
