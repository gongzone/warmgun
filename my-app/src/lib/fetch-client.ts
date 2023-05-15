const prefixUrl =
  process.env.NODE_ENV === "development" ? "http://localhost:3000" : ""

export async function fetchClient(url: string, options?: RequestInit) {
  const res = await fetch(`${prefixUrl}${url}`, {
    ...options,
  })

  return res
}
