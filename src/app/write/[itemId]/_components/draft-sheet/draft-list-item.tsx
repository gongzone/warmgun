"use client"

import Link from "next/link"
import { useParams } from "next/navigation"
import { type Draft } from "@/db/schema"

import { cn } from "@/lib/utils"
import { Icons } from "@/components/@ui/icons"
import { Text } from "@/components/@ui/text"
import { TextWithIcon } from "@/components/@ui/text-with-icon"

import { DraftListItemMenu } from "./draft-list-item-menu"

type DraftListItemProps = {
  draft: Draft
}

export const DraftListItem = ({ draft }: DraftListItemProps) => {
  const pageDraftId = Number(useParams().itemId)

  return (
    <div className="flex items-center gap-4">
      <Link
        href={`/write/${draft.id}?mode=create`}
        className={cn(
          "h-full w-full px-3 py-1.5 transition-colors hover:bg-accent",
          draft.id === pageDraftId && "bg-accent"
        )}
      >
        <TextWithIcon
          icon={<Icons.DocumentText className="h-4 w-4" />}
          text={<Text clamp={1}>{draft.title ?? "제목 없음"}</Text>}
          gap={2}
        />
      </Link>
      <DraftListItemMenu draftId={draft.id} pageDraftId={pageDraftId} />
    </div>
  )
}
