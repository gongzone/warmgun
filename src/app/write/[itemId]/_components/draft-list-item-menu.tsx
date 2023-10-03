import { deleteDraftAction } from "@/lib/services/draft/action"
import { Button } from "@/components/@ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/@ui/dropdown-menu"
import { Icons } from "@/components/@ui/icons"
import { SubmitButton } from "@/components/@ui/submit-button"
import { Text } from "@/components/@ui/text"
import { TextWithIcon } from "@/components/@ui/text-with-icon"

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
        <form action={deleteDraftAction.bind(null, { draftId, pageDraftId })}>
          <DropdownMenuItem asChild>
            <SubmitButton
              uiButton={false}
              className="h-full w-full"
              type="submit"
            >
              <TextWithIcon
                icon={<Icons.Trash className=" h-4 w-4" />}
                text={<Text>삭제하기</Text>}
              />
            </SubmitButton>
          </DropdownMenuItem>
        </form>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
