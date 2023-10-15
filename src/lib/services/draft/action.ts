"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { Prisma } from "@prisma/client"

import { getServerSession } from "@/lib/auth"
import { db } from "@/lib/db"
import { actionResponse, errorMessages } from "@/lib/form-action/utils"

import { fetchDraftCount, fetchOneLatestDraft } from "./fetch"

export async function createDraftAction() {
  const session = await getServerSession("POST")

  if (!session?.user) {
    return actionResponse({
      type: "error",
      message: errorMessages.AUTHENTICATED_FAIL,
    })
  }

  const draftCount = await fetchDraftCount(session.user.userId)

  if (draftCount > 15) {
    return actionResponse({
      type: "error",
      message: "초고는 15개 이상 생성하실 수 없습니다.",
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

type SaveDraftActionParmas = {
  draftId: number
  title: string | null
  body: unknown
}

export async function saveDraftAction({
  draftId,
  title,
  body,
}: SaveDraftActionParmas) {
  const session = await getServerSession("POST")

  if (!session?.user) {
    return actionResponse({
      type: "error",
      message: errorMessages.AUTHENTICATED_FAIL,
    })
  }

  const bodyValue = body as Prisma.JsonObject

  await db.draft.update({
    where: { id: draftId },
    data: { title, body: bodyValue },
  })

  revalidatePath(`/write/[itemId]/@create`, "page")
  return actionResponse({
    type: "success",
    message: "초고 수정에 성공했습니다.",
  })
}

type DeleteDraftActionParmas = {
  draftId: number
  pageDraftId: number
}

export async function deleteDraftAction({
  draftId,
  pageDraftId,
}: DeleteDraftActionParmas) {
  const session = await getServerSession("POST")

  if (!session?.user) {
    return actionResponse({
      type: "error",
      message: errorMessages.AUTHENTICATED_FAIL,
    })
  }

  const draftsCount = await fetchDraftCount(session.user.userId)

  if (draftsCount <= 1) {
    return actionResponse({
      type: "error",
      message: "마지막 초고는 삭제하실 수 없습니다.",
    })
  }

  await db.draft.delete({
    where: { id: draftId },
  })

  revalidatePath(`/write/[itemId]/@create`, "page")

  if (pageDraftId === draftId) {
    const latestDraft = await fetchOneLatestDraft(session.user.userId)
    redirect(`/write/${latestDraft?.id}?mode=create`)
  }
}
