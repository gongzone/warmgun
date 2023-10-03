"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { createDraft, deleteDraft } from "@/db/access/draft/command"
import { findDraftsCount, findOneLatestDraft } from "@/db/access/draft/query"

import { getServerSession } from "@/lib/auth"

export async function createDraftAction() {
  const session = await getServerSession("POST")

  if (!session?.user) {
    return // TODO: send 401 error or redirect login page
  }

  const newDraft = await createDraft(session.user.userId)
  revalidatePath(`/write/[itemId]/@create`, "page")
  redirect(`/write/${newDraft[0].id}?mode=create`)
}

export async function deleteDraftAction({
  draftId,
  pageDraftId,
}: {
  draftId: number
  pageDraftId: number
}) {
  const session = await getServerSession("POST")

  if (!session?.user) {
    return // TODO: send 401 error or redirect login page
  }

  const draftsCount = await findDraftsCount(session.user.userId)

  if (draftsCount <= 1) {
    return // TODO: send message to user
  }

  await deleteDraft(draftId)

  revalidatePath(`/write/[itemId]/@create`, "page")

  if (pageDraftId === draftId) {
    const latestDraftId = (await findOneLatestDraft(session.user.userId)).id
    redirect(`/write/${latestDraftId}?mode=create`)
  }
}
