import * as context from "next/headers"
import { queryClient } from "@/db"
import { postgres as postgresAdapter } from "@lucia-auth/adapter-postgresql"
import { github } from "@lucia-auth/oauth/providers"
import { lucia } from "lucia"
import { nextjs_future } from "lucia/middleware"

import "lucia/polyfill/node"

import { cache } from "react"

export const auth = lucia({
  adapter: postgresAdapter(queryClient, {
    user: "user",
    session: "session",
    key: "key",
  }),
  env: process.env.NODE_ENV === "development" ? "DEV" : "PROD",
  middleware: nextjs_future(),
  sessionCookie: {
    expires: false,
  },
  getUserAttributes: (data) => {
    console.log(data)
    return {
      username: data.username,
      email: data.email,
      avatar: data.avatar,
      role: data.role,
    }
  },
})

export const githubAuth = github(auth, {
  clientId: process.env.GITHUB_CLIENT_ID ?? "",
  clientSecret: process.env.GITHUB_CLIENT_SECRET ?? "",
})

export const getAuthRequest = (method?: string) => {
  const requestMethod = method ? method : "GET"
  const authRequest = auth.handleRequest(requestMethod, context)

  return authRequest
}

export const getServerSession = cache((method?: string) => {
  const requestMethod = method ? method : "GET"
  const authRequest = auth.handleRequest(requestMethod, context)

  return authRequest.validate()
})

// export const getPageSession = cache(() => {
//   const authRequest = auth.handleRequest("GET", context)
//   return authRequest.validate()
// })

export type Auth = typeof auth
