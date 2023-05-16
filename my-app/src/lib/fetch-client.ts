import { cookies } from "next/headers"

const prefixUrl =
  process.env.NODE_ENV === "development" ? "http://localhost:3000" : ""

export async function fetchClient(url: string, options?: RequestInit) {
  const res = await fetch(`${prefixUrl}${url}`, {
    credentials: "include",
    headers: {
      Cookie: cookies()
        .getAll()
        .map((cookie) => `${cookie.name}=${cookie.value}`)
        .join(";"),
    },
    ...options,
  })

  return res
}
