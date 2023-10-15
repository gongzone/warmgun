import { Button } from "@/components/@ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/@ui/dropdown-menu"
import { Icons } from "@/components/@ui/icons"

import { DraftDeleteDialog } from "./draft-delete-dialog"

type DraftListItemMenuProps = {
  draftId: number
}

export const DraftListItemMenu = ({ draftId }: DraftListItemMenuProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="xs" onlyIcon>
          <Icons.EllipsisVertical className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-32">
        <DropdownMenuLabel>초고 설정</DropdownMenuLabel>
        <DraftDeleteDialog draftId={draftId} />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
