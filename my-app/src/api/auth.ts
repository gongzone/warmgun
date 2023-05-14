import { fetchClient } from "@/lib/clients/fetch"

export async function signup(data: any) {
  return await fetchClient("/api/auth/signup", {
    method: "POST",
    body: JSON.stringify(data),
  })
}

export async function login(data: any) {
  return await fetchClient("/api/auth/login", {
    method: "POST",
    body: JSON.stringify(data),
  })
}
