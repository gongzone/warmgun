import { cache } from "react"
import * as draftQueries from "@/db/access/draft/query"

import { db } from "@/lib/db"

export const fetchOneDraft = cache(draftQueries.findOneDraft)
export const fetchDrafts = cache(draftQueries.findDrafts)

export const fetchOneLatestDraft = cache(async (userId: string) => {
  const latestDraft = await db.draft.findFirst({
    where: { userId },
    orderBy: { updatedAt: "desc" },
  })

  return latestDraft
})
