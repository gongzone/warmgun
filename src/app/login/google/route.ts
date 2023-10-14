import { cookies } from "next/headers"
import { NextResponse } from "next/server"

import { googleAuth } from "@/lib/auth"

export const GET = async () => {
  const [url, state] = await googleAuth.getAuthorizationUrl()

  cookies().set("google_oauth_state", state, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60,
  })

  return new NextResponse(null, {
    status: 302,
    headers: {
      Location: url.toString(),
    },
  })
}
