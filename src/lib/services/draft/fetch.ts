import { cache } from "react"
import * as draftQueries from "@/db/access/draft/query"

export const fetchDrafts = cache(draftQueries.findDrafts)
