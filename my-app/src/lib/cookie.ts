import { cookies } from "next/headers"

import { tokenExpires } from "@/lib/jwt"

export const COOKIE_TOKEN_ID = "token_id"
export const COOKIE_ACCESS_TOKEN = "access_token"
export const COOKIE_REFRESH_TOKEN = "refresh_token"

export function setAuthCookies({
  tokenId,
  accessToken,
  refreshToken,
}: {
  tokenId: string
  accessToken: string
  refreshToken: string
}) {
  // @ts-ignore
  cookies().set(COOKIE_TOKEN_ID, tokenId, {
    path: "/",
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    maxAge: tokenExpires["refresh"] / 1000,
  })
  // @ts-ignore
  cookies().set(COOKIE_ACCESS_TOKEN, accessToken, {
    path: "/",
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    maxAge: tokenExpires["access"] / 1000,
  })

  cookies().set(COOKIE_REFRESH_TOKEN, refreshToken, {
    path: "/",
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    maxAge: tokenExpires["refresh"] / 1000,
  })
}

export function deleteAuthCookies() {
  // @ts-ignore
  cookies().set(COOKIE_TOKEN_ID, "", { path: "/", maxAge: 0 })
  // @ts-ignore
  cookies().set(COOKIE_ACCESS_TOKEN, "", { path: "/", maxAge: 0 })
  // @ts-ignore
  cookies().set(COOKIE_REFRESH_TOKEN, "", { path: "/", maxAge: 0 })
}
