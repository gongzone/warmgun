import { client } from '../client'
import { Headers } from '@remix-run/node'

export async function signup(params: SignupBody) {
  const response = await client.post<AuthResult>('http://localhost:4000/api/auth/signup', params)

  const result = response.data
  const cookieHeader = response.headers['set-cookie']

  const headers = createCookieHeaders(cookieHeader)

  return { result, headers }
}

export async function login(params: LoginBody) {
  const response = await client.post<AuthResult>('http://localhost:4000/api/auth/login', params)

  const result = response.data
  const cookieHeader = response.headers['set-cookie']

  const headers = createCookieHeaders(cookieHeader)

  return { result, headers }
}

function createCookieHeaders(setCookieHeader: string[] | undefined) {
  if (!setCookieHeader || setCookieHeader?.length === 0) {
    throw new Error('No cookie header')
  }

  const headers = new Headers()
  setCookieHeader.forEach((cookie) => {
    headers.append('Set-Cookie', cookie)
  })

  return headers
}

export interface SignupBody {
  username: string
  password: string
  confirmPassword: string
  email: string
}

interface LoginBody {
  username: string
  password: string
}

export interface AuthResult {
  tokens: {
    accessToken: string
    refreshToken: string
  }
  user: {
    id: number
    username: string
    email: string
  }
}
