import { NextRequest, NextResponse } from "next/server"
import * as argon2 from "argon2"
import dayjs from "dayjs"

import {
  COOKIE_ACCESS_TOKEN,
  COOKIE_REFRESH_TOKEN,
  COOKIE_TOKEN_ID,
  deleteAuthCookies,
  setAuthCookies,
} from "./cookie"
import { prisma } from "./db"
import {
  TokenPayloadReturn,
  generateTokens,
  tokenExpires,
  verifyToken,
} from "./jwt"

interface WithAuthConfig {
  mode: "error" | "no-error"
  callback: (
    request: NextRequest,
    userId: number | null
  ) => Promise<NextResponse>
}

export function withAuth({ mode = "error", callback }: WithAuthConfig) {
  function exitAuthentication() {
    if (mode === "error") {
      throw new Error(
        "제한된 접근입니다. 인증이 만료되었거나 비정상적인 인증 토큰 갱신 요청이 원인일 수 있습니다."
      )
    } else {
      return null
    }
  }

  return async (request: NextRequest) => {
    const tokenId = request.cookies.get(COOKIE_TOKEN_ID)?.value
    const accessToken = request.cookies.get(COOKIE_ACCESS_TOKEN)?.value
    const refreshToken = request.cookies.get(COOKIE_REFRESH_TOKEN)?.value

    console.log(refreshToken)
    if (!tokenId || !refreshToken) {
      exitAuthentication()
      return callback(request, null)
    }

    if (accessToken) {
      const accessPayload = await verifyToken("access", accessToken)

      if (accessPayload) {
        return callback(request, accessPayload.userId)
      }

      const refreshPayload = await verifyToken("refresh", refreshToken)

      if (!refreshPayload) {
        exitAuthentication()
        return callback(request, null)
      }

      try {
        const { userId, newAccessToken, newRefreshToken } = await refreshAuth(
          tokenId,
          refreshToken,
          refreshPayload
        )

        const response = await callback(request, userId)

        response.headers.set(
          "Set-Cookie",
          `access_token=${newAccessToken};refresh_token=${newRefreshToken};`
        )
        return response
      } catch {
        exitAuthentication()
        return callback(request, null)
      }
    }

    const refreshPayload = await verifyToken("refresh", refreshToken)

    if (!refreshPayload) {
      exitAuthentication()
      return callback(request, null)
    }

    try {
      const { userId, newAccessToken, newRefreshToken } = await refreshAuth(
        tokenId,
        refreshToken,
        refreshPayload
      )

      const response = await callback(request, userId)

      setAuthCookies({
        tokenId,
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
      })

      response.cookies.set("access_token", newAccessToken, {
        path: "/",
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production",
        maxAge: tokenExpires["access"] / 1000,
      })
      response.cookies.set("refresh_token", newRefreshToken, {
        path: "/",
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production",
        maxAge: tokenExpires["refresh"] / 1000,
      })

      response.headers.set("Access-Control-Allow-Origin", "*")
      response.headers.set(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, OPTIONS"
      )
      response.headers.set(
        "Access-Control-Allow-Headers",
        "Content-Type, Authorization, Cookie"
      )

      return response
    } catch {
      exitAuthentication()
      return callback(request, null)
    }
  }
}

function setCookies(
  response: NextResponse,
  accessToken: string,
  refreshToken: string
) {
  response.cookies.set(COOKIE_ACCESS_TOKEN, accessToken, {
    path: "/",
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    maxAge: tokenExpires["access"] / 1000,
  })

  response.cookies.set(COOKIE_REFRESH_TOKEN, refreshToken, {
    path: "/",
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    maxAge: tokenExpires["refresh"] / 1000,
  })

  return response
}

async function refreshAuth(
  tokenId: string,
  refreshToken: string,
  payload: TokenPayloadReturn
) {
  const token = await prisma.token.findUnique({
    where: { id_userId: { id: tokenId, userId: payload.userId } },
  })

  if (!token) {
    throw new Error("인증 토큰을 찾을 수 없습니다.")
  }

  const match = await argon2.verify(token.refreshToken, refreshToken)
  console.log(match)
  /* Rotate Refresh Token */
  // if (!match && dayjs().diff(new Date(payload.iat * 1000), "seconds") > 60) {
  //   await prisma.token.deleteMany({ where: { userId: token.userId } })
  //   throw new Error("비정상적인 인증 토큰 갱신 요청으로 강제 로그아웃 됩니다.")
  // }

  const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
    await generateTokens({
      userId: payload.userId,
      username: payload.username,
    })
  const hashedRefreshToken = await argon2.hash(newRefreshToken)

  await prisma.token.update({
    where: { id_userId: { id: tokenId, userId: payload.userId } },
    data: { refreshToken: hashedRefreshToken },
  })

  return { userId: payload.userId, newAccessToken, newRefreshToken }
}
