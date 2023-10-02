"use client"

import { useParams } from "next/navigation"

import { deleteDraftAction } from "@/lib/services/draft/action"
import { Button } from "@/components/@ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/@ui/dropdown-menu"
import { Icons } from "@/components/@ui/icons"
import { Text } from "@/components/@ui/text"

type DraftMenuProps = {
  draftId: number
}

export const DraftMenu = ({ draftId }: DraftMenuProps) => {
  const currentDraftId = Number(useParams().itemId)
  const action = deleteDraftAction.bind(null, { currentDraftId, draftId })

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="xs" onlyIcon>
          <Icons.EllipsisVertical className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-32">
        <form action={action}>
          <DropdownMenuGroup>
            <DropdownMenuItem asChild>
              <button className="flex h-full w-full items-center" type="submit">
                <Icons.Trash className="mr-2 h-4 w-4" />
                <Text>삭제하기</Text>
              </button>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </form>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
