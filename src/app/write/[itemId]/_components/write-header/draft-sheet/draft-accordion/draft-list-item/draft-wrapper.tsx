"use client"

import React from "react"
import Link from "next/link"
import { useParams } from "next/navigation"

import { cn } from "@/lib/utils"

type DraftWrapperProps = {
  children: React.ReactNode
  draftId: number
}

export const DraftWrapper = ({ children, draftId }: DraftWrapperProps) => {
  const currentDraftId = Number(useParams().itemId)

  return (
    <Link
      href={`/write/${draftId}?mode=create`}
      className={cn(
        "flex h-full w-full items-center justify-between px-3 py-1.5 transition-colors hover:bg-accent",
        draftId === currentDraftId && "bg-accent"
      )}
    >
      {children}
    </Link>
  )
}
