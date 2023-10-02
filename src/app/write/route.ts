import { redirect } from "next/navigation"
import { createDraft } from "@/db/access/draft/command"

import { getServerSession } from "@/lib/auth"
import { fetchOneLatestDraft } from "@/lib/services/draft/fetch"

export async function GET() {
  const session = await getServerSession()

  if (!session || !session.user) {
    return // TODO: Add 401 error
  }
  let latestDraftId = (await fetchOneLatestDraft(session.user.userId)).id

  if (!latestDraftId) {
    const newDraft = await createDraft(session.user.userId)
    latestDraftId = newDraft[0].id
  }

  redirect(`/write/${latestDraftId}?mode=create`)
}
