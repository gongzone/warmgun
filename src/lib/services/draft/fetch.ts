import { cache } from "react"
import * as draftQueries from "@/db/access/draft/query"

export const fetchOneDraft = cache(draftQueries.findOneDraft)
export const fetchDrafts = cache(draftQueries.findDrafts)
export const fetchOneLatestDraft = cache(draftQueries.findOneLatestDraft)
