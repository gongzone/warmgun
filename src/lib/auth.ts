import * as context from "next/headers"
import { prisma as prismaAdapter } from "@lucia-auth/adapter-prisma"
import { github, google } from "@lucia-auth/oauth/providers"
import { lucia, LuciaError, type User } from "lucia"
import { nextjs_future } from "lucia/middleware"
import { __experimental_joinAdapters as joinAdapters } from "lucia/utils"

import { db } from "@/lib/db"

import "lucia/polyfill/node"

import { cache } from "react"
import { Prisma } from "@prisma/client"

type PossiblePrismaError = {
  code: string
  message: string
}

export const auth = lucia({
  adapter: joinAdapters(
    prismaAdapter(db, {
      user: "user",
      session: "session",
      key: "key",
    }),
    {
      getUser: async (userId) => {
        return await db.user.findUnique({
          where: { id: userId },
          include: {
            profile: {
              include: {
                profileLinks: true,
              },
            },
          },
        })
      },
      setUser: async (user, key) => {
        const userInput: Prisma.UserCreateInput = {
          id: user.id,
          username: user.username,
          email: user.email,
          role: user.role,
          profile: {
            create: {
              displayName: user.profile!.displayName,
              avatar: user.profile!.avatar,
              who: user.profile!.who,
              bio: user.profile!.bio,
              blogName: user.profile!.blogName,
              profileLinks: { create: {} },
            },
          },
          drafts: { create: {} },
        }

        if (!key) {
          await db.user.create({ data: userInput })
          return
        }
        try {
          await db.$transaction([
            db.user.create({ data: userInput }),
            db.key.create({
              data: key,
            }),
          ])
        } catch (e) {
          const error = e as Partial<PossiblePrismaError>
          if (error.code === "P2002" && error.message?.includes("`id`"))
            throw new LuciaError("AUTH_DUPLICATE_KEY_ID")
          throw error
        }
      },
    }
  ),
  env: process.env.NODE_ENV === "development" ? "DEV" : "PROD",
  middleware: nextjs_future(),
  sessionCookie: {
    expires: false,
  },
  getUserAttributes: (data) => {
    return {
      username: data.username,
      email: data.email,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
      role: data.role,
      profile: data.profile,
    }
  },
})

export type Auth = typeof auth
export type SessionUser = User

export const googleAuth = google(auth, {
  clientId: process.env.GOOGLE_CLIENT_ID ?? "",
  clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
  redirectUri: process.env.GOOGLE_REDIRECT_URI ?? "",
  scope: ["email", "profile"],
})

export const githubAuth = github(auth, {
  clientId: process.env.GITHUB_CLIENT_ID ?? "",
  clientSecret: process.env.GITHUB_CLIENT_SECRET ?? "",
  redirectUri: process.env.GITHUB_REDIRECT_URI ?? "",
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
