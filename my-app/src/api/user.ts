import { fetchClient } from "@/lib/clients/fetch"

export async function findMe() {
  return await fetchClient<Me | null>("/api/users/me", {
    next: { tags: ["me"] },
  })
}

export interface Me {
  username: string
  email: string
  role: "USER" | "ADMIN"
  profile: {
    nickname: string
    field: string
    bio: string
    avatar: string | null
  }
}
