"use client"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/@ui/alert-dialog"
import { DropdownMenuItem } from "@/components/@ui/dropdown-menu"

import { DeleteDraftForm } from "./delete-draft-form"

type DraftDeleteDialogProps = {
  draftId: number
}

export const DraftDeleteDialog = ({ draftId }: DraftDeleteDialogProps) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <DropdownMenuItem
          onSelect={(e) => {
            e.preventDefault()
          }}
        >
          삭제하기
        </DropdownMenuItem>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>초고 삭제</AlertDialogTitle>
          <AlertDialogDescription>
            정말로 삭제하시겠습니까?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>취소</AlertDialogCancel>
          <AlertDialogAction asChild>
            <DeleteDraftForm draftId={draftId} />
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}