import { Prisma } from "@prisma/client"

const userWithProfile = Prisma.validator<Prisma.UserDefaultArgs>()({
  include: { profile: { include: { profileLinks: true } } },
})

export type UserWithProfile = Prisma.UserGetPayload<typeof userWithProfile>

export type NewUser = Prisma.UserCreateInput
