import { redirect } from "next/navigation"

import { getServerSession } from "@/lib/auth"
import { fetchOneLatestDraft } from "@/lib/services/draft/fetch"

export async function GET() {
  const session = await getServerSession()

  if (!session || !session.user) {
    return // TODO: Add 401 error
  }

  const latestDraft = await fetchOneLatestDraft(session.user.userId)

  if (!latestDraft) {
    return // TODO: create Draft
  }

  redirect(`/write/${latestDraft.id}?mode=create`)
}
