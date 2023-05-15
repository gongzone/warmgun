import { createDecoder, createSigner, createVerifier } from "fast-jwt"

export type TokenMode = "access" | "refresh"

export interface TokenPayload {
  userId: number
  username: string
}

export interface TokenPayloadReturn extends TokenPayload {
  iat: number
  exp: number
}

export const tokenExpires = {
  access: 1000 * 60 * 10, // 10s
  refresh: 1000 * 60 * 60 * 24 * 7, // 7d
} as const

export async function generateTokens(payload: TokenPayload): Promise<{
  accessToken: string
  refreshToken: string
}> {
  const [accessToken, refreshToken] = await Promise.all([
    generateToken("access", payload),
    generateToken("refresh", payload),
  ])

  return { accessToken, refreshToken }
}

export async function verifyToken(
  mode: TokenMode,
  token: string
): Promise<TokenPayloadReturn | null> {
  const verifier = createVerifier({
    key: async () =>
      mode === "access"
        ? process.env.JWT_ACCESS_KEY
        : process.env.JWT_REFRESH_KEY,
    cache: 1000,
  })

  try {
    const payload: TokenPayloadReturn = await verifier(token)
    return payload
  } catch (err) {
    return null
  }
}

export async function decodeToken(token: string): Promise<TokenPayloadReturn> {
  const decoder = createDecoder()

  const payload: TokenPayloadReturn = decoder(token)
  return payload
}

async function generateToken(
  mode: TokenMode,
  payload: TokenPayload
): Promise<string> {
  const signer = createSigner({
    key: async () =>
      mode === "access"
        ? process.env.JWT_ACCESS_KEY
        : process.env.JWT_REFRESH_KEY,
    expiresIn: tokenExpires[mode],
  })

  const token = await signer(payload)
  return token
}
