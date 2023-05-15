"use server"

import { revalidateTag } from "next/cache"
import * as argon2 from "argon2"
import z from "zod"

import { setAuthCookies } from "@/lib/cookie"
import { prisma } from "@/lib/db"
import { generateTokens } from "@/lib/jwt"
import { validateFormData } from "@/lib/validation"

const loginSchema = z.object({
  username: z.string().min(1, "아이디를 입력해주세요."),
  password: z.string().min(1, "비밀번호를 입력해주세요."),
})

export async function login(formData: FormData) {
  const { username, password } = validateFormData(formData, loginSchema)

  const foundUser = await prisma.user.findUnique({
    where: { username },
  })

  if (!foundUser) {
    throw new Error("잘못된 아이디입니다.")
  }

  const matched = await argon2.verify(foundUser.password, password)

  if (!matched) {
    throw new Error("잘못된 비밀번호입니다.")
  }

  const { accessToken, refreshToken } = await generateTokens({
    userId: foundUser.id,
    username: foundUser.username,
  })
  const hashedRefreshToken = await argon2.hash(refreshToken)

  const token = await prisma.token.create({
    data: {
      refreshToken: hashedRefreshToken,
      user: { connect: { id: foundUser.id } },
    },
  })

  setAuthCookies({
    tokenId: token.id,
    accessToken,
    refreshToken,
  })

  revalidateTag("me")
}
