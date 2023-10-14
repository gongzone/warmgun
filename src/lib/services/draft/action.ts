"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { deleteDraft, updateDraft } from "@/db/access/draft/command"
import { findDraftsCount, findOneLatestDraft } from "@/db/access/draft/query"

import { getServerSession } from "@/lib/auth"
import { db } from "@/lib/db"
import { actionResponse, errorMessages } from "@/lib/form-action"

export async function createDraftAction() {
  const session = await getServerSession("POST")

  if (!session?.user) {
    return actionResponse({
      type: "error",
      message: errorMessages.AUTHENTICATED_FAIL,
    })
  }

  const newDraft = await db.draft.create({
    data: {
      userId: session.user.userId,
    },
  })

  revalidatePath(`/write/[itemId]/@create`, "page")
  redirect(`/write/${newDraft.id}?mode=create`)
}

export async function saveDraftAction({
  draftId,
  title,
  body,
}: {
  draftId: number
  title: string | null
  body: unknown
}) {
  const session = await getServerSession("POST")

  if (!session?.user) {
    return // TODO: send 401 error or redirect login page
  }

  console.log("서버!", title, body)

  await updateDraft(draftId, { title, body })

  revalidatePath(`/write/[itemId]/@create`, "page")

  return { isSuccess: true, message: "초고를 성공적으로 저장했습니다. 🎉" }
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
