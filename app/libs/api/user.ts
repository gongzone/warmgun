import { client } from '../client'

export async function getMe(accessToken: string) {
  const response = await client.get<GetMeResult>('http://localhost:4000/api/users/me', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

  return response.data
}

export interface GetMeResult {
  id: number
  username: string
  email: string
  character: {
    image: string
  }
}
