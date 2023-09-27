import { cookies, headers } from "next/headers"
import { NextResponse, type NextRequest } from "next/server"
import { OAuthRequestError } from "@lucia-auth/oauth"

import { auth, githubAuth } from "@/lib/auth"

export const GET = async (request: NextRequest) => {
  const storedState = cookies().get("github_oauth_state")?.value
  const url = new URL(request.url)
  const state = url.searchParams.get("state")
  const code = url.searchParams.get("code")
  // validate state
  if (!storedState || !state || storedState !== state || !code) {
    return new NextResponse(null, {
      status: 400,
    })
  }
  try {
    const { getExistingUser, githubUser, createUser } =
      await githubAuth.validateCallback(code)

    const getUser = async () => {
      const existingUser = await getExistingUser()
      if (existingUser) return existingUser
      const user = await createUser({
        attributes: {
          username: githubUser.login,
          email: githubUser.email,
          avatar: githubUser.avatar_url,
          role: "USER",
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
        Location: "/", // redirect to profile page
      },
    })
  } catch (e) {
    if (e instanceof OAuthRequestError) {
      // invalid code
      return new NextResponse(null, {
        status: 400,
      })
    }
    return new NextResponse(null, {
      status: 500,
    })
  }
}
