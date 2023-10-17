import { cache } from "react"
import { Prisma } from "@prisma/client"

import { db } from "@/lib/db"

export const userArgs = Prisma.validator<Prisma.UserDefaultArgs>()({
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

export type UserDisplay = Prisma.UserGetPayload<typeof userArgs>

type FetchUsersOptions = {
  filter?: "recent" | "best"
}

export const fetchUsers = cache(
  async ({ filter = "recent" }: FetchUsersOptions) => {
    const users = await db.user.findMany({
      take: 10,
      select: userArgs.select,
      orderBy:
        filter === "best"
          ? { followees: { _count: "desc" } }
          : { createdAt: "desc" },
    })

    return users
  }
)
