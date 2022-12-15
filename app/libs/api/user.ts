import { client } from '../client'

export async function getMe() {
  const response = await client.get<GetMeResult>('http://localhost:4000/api/users/me')

  const result = response.data

  return result
}

export interface GetMeResult {
  id: number
  username: string
  email: string
}
