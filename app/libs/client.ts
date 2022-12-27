import axios from 'axios'

export const client = axios.create({
  baseURL: 'http://localhost:4000',
  withCredentials: true,
})

export function setClientHeaders(accessToken: string) {
  client.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`
  // client.defaults.headers.common[
  //   'Cookie'
  // ] = `access_token=${accessToken}; refresh_token=${refreshToken}`
}

export function clearClientHeaders() {
  delete client.defaults.headers.common['Authorization']
  // delete client.defaults.headers.common['Cookie']
}
