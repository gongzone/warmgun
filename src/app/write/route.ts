import { redirect } from "next/navigation"
import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"

import { authOptions } from "@/lib/auth"

export async function GET(request: Request) {
  const session = await getServerSession(authOptions)

  console.log(session)

  if (!session || !session.user) {
    redirect("/")
  }

  // TODO: solve authOptions type problem

  // check whether user has at least one drafts

  // no -> create new draft to user

  // redirect to latest draft
}
