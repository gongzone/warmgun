import { client } from '../client'

export async function signup(params: SignupBody) {
  const response = await client.post<AuthResult>('/api/auth/signup', params)

  return response.data
}

export async function login(params: LoginBody) {
  const response = await client.post<AuthResult>('/api/auth/login', params)

  return response.data
}

export async function refresh(params: RefreshBody) {
  const response = await client.post<RefreshResult>('/api/auth/refresh', params ?? {})

  return response.data
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
  expiredDate: string
  user: {
    id: number
    username: string
    email: string
  }
}

interface RefreshBody {
  refreshToken?: string
}

export interface RefreshResult {
  accessToken: string
  refreshToken: string
  expiredDate: string
}
