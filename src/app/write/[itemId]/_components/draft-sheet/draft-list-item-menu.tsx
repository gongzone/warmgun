"use client"

import { deleteDraftAction } from "@/lib/services/draft/action"
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
import { Button } from "@/components/@ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/@ui/dropdown-menu"
import { Icons } from "@/components/@ui/icons"
import { SubmitButton } from "@/components/@ui/submit-button"
import { Text } from "@/components/@ui/text"
import { TextWithIcon } from "@/components/@ui/text-with-icon"

import { DeleteAlertDialog } from "./delete-alert-dialog"

type DraftMenuProps = {
  draftId: number
  pageDraftId: number
}

export const DraftListItemMenu = ({ draftId, pageDraftId }: DraftMenuProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="xs" onlyIcon>
          <Icons.EllipsisVertical className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-32">
        {/* <form action={deleteDraftAction.bind(null, { draftId, pageDraftId })}> */}
        <DropdownMenuLabel>설정</DropdownMenuLabel>
        <DeleteAlertDialog />
        {/* </form> */}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
