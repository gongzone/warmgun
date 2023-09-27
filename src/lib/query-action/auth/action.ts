"use server"

import { redirect } from "next/navigation"

import { auth, getAuthRequest } from "@/lib/auth"

export async function logout() {
  const authRequest = getAuthRequest("POST")
  const session = await authRequest.validate()

  if (!session) {
    return // TODO: Add 401 error
  }

  await auth.invalidateSession(session.sessionId)
  authRequest.setSession(null)

  redirect("/")
}
