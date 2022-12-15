import { type ThrownResponse, useCatch } from '@remix-run/react'
import { AxiosError } from 'axios'
import { client } from './client'

export function isNextError(e: any): e is AppError {
  return e?.statusCode !== undefined && e?.message !== undefined && e?.name !== undefined
}

export interface AppError {
  name:
    | 'Unauthorized'
    | 'Forbidden'
    | 'UserExists'
    | 'WrongCredentials'
    | 'Unknown'
    | 'BadRequest'
    | 'RefreshFailure'
    | 'NotFound'
    | 'InvalidURL'
    | 'AlreadyExists'
  statusCode: number
  message: string
  payload?: any
  e?: any
}

export function extractError(e: any): AppError {
  if (e instanceof AxiosError) {
    const data = e.response?.data
    if (isNextError(data)) {
      return data
    }
  }
  return {
    statusCode: 500,
    message: e?.message ?? 'Unknown error',
    name: e?.name ?? 'Unknown',
    payload: {
      baseUrl: client.defaults.baseURL,
    },
  }
}

export function useNextAppErrorCatch() {
  const caught = useCatch<ThrownResponse<number, AppError>>()
  return caught
}
