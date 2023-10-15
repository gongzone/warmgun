import { cache } from "react"
import { Prisma } from "@prisma/client"

import { db } from "@/lib/db"

export const fetchOneDraft = cache(async (draftId: number) => {
  const draft = await db.draft.findUnique({
    where: { id: draftId },
  })

  return draft
})

export const fetchDrafts = cache(async (userId: string) => {
  const drafts = await db.draft.findMany({
    where: { userId },
    orderBy: { updatedAt: "desc" },
  })

  return drafts
})

export type FetchDraftsReturn = Prisma.PromiseReturnType<typeof fetchDrafts>

export const fetchOneLatestDraft = cache(async (userId: string) => {
  const latestDraft = await db.draft.findFirst({
    where: { userId },
    orderBy: { updatedAt: "desc" },
  })

  return latestDraft
})

export const fetchDraftCount = cache(async (userId: string) => {
  const draftCount = await db.draft.count({
    where: { userId },
  })

  return draftCount
})
