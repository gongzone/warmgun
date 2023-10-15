"use client"

import Link from "next/link"
import { useParams } from "next/navigation"

import { type FetchDraftsReturn } from "@/lib/services/draft/fetch"
import { cn } from "@/lib/utils"
import { TextWithIcon } from "@/components/@ui/text-with-icon"

type DraftListItemProps = {
  draft: FetchDraftsReturn[0]
}

export const DraftListItem = ({ draft }: DraftListItemProps) => {
  const pageDraftId = Number(useParams().itemId)

  return (
    <Link
      href={`/write/${draft.id}?mode=create`}
      className={cn(
        "h-full w-full px-3 py-1.5 transition-colors hover:bg-accent",
        draft.id === pageDraftId && "bg-accent"
      )}
    >
      <TextWithIcon
        icon={(Icons) => <Icons.DocumentText className="h-4 w-4" />}
        text={(Text) => <Text clamp={1}>{draft.title ?? "제목 없음"}</Text>}
        gap={2}
      />
    </Link>
  )
}
