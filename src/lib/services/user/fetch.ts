import { cache } from "react"
import { Prisma } from "@prisma/client"

import { db } from "@/lib/db"

export const userDisplayArgs = Prisma.validator<Prisma.UserDefaultArgs>()({
  select: {
    id: true,
    username: true,
    email: true,
    createdAt: true,
    profile: true,
    _count: {
      select: {
        articles: true,
        followers: true,
        followees: true,
      },
    },
  },
})

export const userDetailArgs = Prisma.validator<Prisma.UserDefaultArgs>()({
  select: {
    id: true,
    username: true,
    email: true,
    createdAt: true,
    profile: { include: { profileLinks: true } },
    _count: {
      select: {
        articles: true,
        followers: true,
        followees: true,
      },
    },
  },
})

export type UserDisplay = Prisma.UserGetPayload<typeof userDisplayArgs>
export type UserDetail = Prisma.UserGetPayload<typeof userDetailArgs>

type FetchUsersOptions = {
  filter?: "recent" | "best"
}

export const fetchUsers = cache(
  async ({ filter = "recent" }: FetchUsersOptions) => {
    const users = await db.user.findMany({
      take: 10,
      select: userDisplayArgs.select,
      orderBy:
        filter === "best"
          ? { followees: { _count: "desc" } }
          : { createdAt: "desc" },
    })

    return users
  }
)

export const fetchOneUser = cache(async (username: string) => {
  const user = await db.user.findUnique({
    where: { username },
    select: userDetailArgs.select,
  })

  return user
})
