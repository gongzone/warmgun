"use server"

import { revalidateTag } from "next/cache"
import * as argon2 from "argon2"
import z from "zod"

import { setAuthCookies } from "@/lib/cookie"
import { prisma } from "@/lib/db"
import { generateTokens } from "@/lib/jwt"
import { validateFormData } from "@/lib/validation"

const signupSchema = z
  .object({
    username: z.string().regex(/^[A-Za-z]{1}[A-Za-z0-9]{4,19}$/, {
      message: "아이디 생성 규칙을 확인하세요.",
    }),
    password: z
      .string()
      .regex(
        /^(?!((?:[A-Za-z]+)|(?:[~!@#$%^&*()_+=]+)|(?:[0-9]+))$)[A-Za-z\d~!@#$%^&*()_+=]{8,20}$/,
        {
          message: "비밀번호 생성 규칙을 확인하세요.",
        }
      ),
    confirm: z.string(),
    email: z
      .string()
      .email({ message: "이메일 규칙에 따라 작성하여 주십시오." }),
  })
  .refine((data) => data.password === data.confirm, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["confirm"],
  })

export async function signup(formData: FormData) {
  const { username, password, email } = validateFormData(formData, signupSchema)

  const foundUser = await prisma.user.findFirst({
    where: {
      OR: [{ username }, { email }],
    },
  })

  if (foundUser) {
    throw new Error("해당 아이디 혹은 이메일을 가진 사용자가 이미 존재합니다.")
  }

  const hashedPassword = await argon2.hash(password)

  const user = await prisma.user.create({
    data: {
      username,
      password: hashedPassword,
      email,
      profile: {
        create: {
          nickname: username,
          field: "블로거",
          bio: `안녕하세요. ${username}입니다.`,
        },
      },
      drafts: { create: {} },
    },
  })

  /* Todo: meilisearch Add Index */

  const { accessToken, refreshToken } = await generateTokens({
    userId: user.id,
    username: user.username,
  })
  const hashedRefreshToken = await argon2.hash(refreshToken)

  const token = await prisma.token.create({
    data: {
      refreshToken: hashedRefreshToken,
      user: { connect: { id: user.id } },
    },
  })

  setAuthCookies({
    tokenId: token.id,
    accessToken,
    refreshToken,
  })

  revalidateTag("me")
}
