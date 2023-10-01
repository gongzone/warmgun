"use client"

import React from "react"
import { useParams } from "next/navigation"

import { cn } from "@/lib/utils"

type DraftWrapperProps = {
  children: React.ReactNode
  currentDraftId: number
}

export const DraftWrapper = ({
  children,
  currentDraftId,
}: DraftWrapperProps) => {
  const draftId = Number(useParams().itemId)

  return (
    <div
      className={cn(
        "flex h-full w-full cursor-pointer items-center justify-between px-3 py-1 transition-colors hover:bg-accent",
        draftId === currentDraftId && "bg-accent"
      )}
    >
      {children}
    </div>
  )
}
