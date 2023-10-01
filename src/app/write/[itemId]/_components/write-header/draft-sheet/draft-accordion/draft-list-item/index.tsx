import { type Draft } from "@/db/schema"

import { Icons } from "@/components/@ui/icons"
import { Text } from "@/components/@ui/text"

import { DraftMenu } from "./draft-menu"
import { DraftWrapper } from "./draft-wrapper"

type DraftListItemProps = {
  draft: Draft
}

export const DraftListItem = ({ draft }: DraftListItemProps) => {
  return (
    <DraftWrapper currentDraftId={draft.id}>
      <div className="flex items-center gap-2">
        <Icons.DocumentText className="h-4 w-4" />
        <Text>{draft.title ?? "제목 없음"}</Text>
      </div>
      <DraftMenu />
    </DraftWrapper>
  )
}
