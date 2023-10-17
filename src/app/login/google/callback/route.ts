import { cookies, headers } from "next/headers"
import { NextResponse, type NextRequest } from "next/server"
import { OAuthRequestError } from "@lucia-auth/oauth"

import { auth, googleAuth } from "@/lib/auth"

export const GET = async (request: NextRequest) => {
  const storedState = cookies().get("google_oauth_state")?.value
  const url = new URL(request.url)
  const state = url.searchParams.get("state")
  const code = url.searchParams.get("code")

  if (!storedState || !state || storedState !== state || !code) {
    return new NextResponse(null, {
      status: 400,
    })
  }

  try {
    const { getExistingUser, googleUser, createUser } =
      await googleAuth.validateCallback(code)

    const email = googleUser.email

    if (!email) {
      throw new Error("no email") // TODO: 수정할 것
    }

    const getUser = async () => {
      const existingUser = await getExistingUser()
      if (existingUser) return existingUser

      const user = await createUser({
        attributes: {
          username: email.split("@")[0],
          email: googleUser.email ?? null,
          role: "USER",
          //@ts-ignore
          profile: {
            displayName: googleUser.given_name,
            avatar: googleUser.picture,
            who: "블로거",
            bio: `반갑습니다. ${googleUser.given_name}입니다.`,
            blogName: `${googleUser.given_name}의 블로그`,
          },
        },
      })
      return user
    }

    const user = await getUser()
    const session = await auth.createSession({
      userId: user.userId,
      attributes: {},
    })
    const authRequest = auth.handleRequest(request.method, {
      cookies,
      headers,
    })
    authRequest.setSession(session)

    return new NextResponse(null, {
      status: 302,
      headers: {
        Location: "/",
      },
    })
  } catch (e) {
    if (e instanceof OAuthRequestError) {
      return new NextResponse(null, {
        status: 400,
      })
    }
    return new NextResponse(null, {
      status: 500,
    })
  }
}
