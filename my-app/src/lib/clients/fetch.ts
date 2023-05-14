const prefixUrl = "http://127.0.0.1:3001"

export async function fetchClient<T>(
  url: string,
  options?: RequestInit
):
  | Promise<{
      success: true
      data: T
    }>
  | Promise<{
      success: false
      data: string
    }> {
  const res = await fetch(`${prefixUrl}${url}`, {
    credentials: "include",
    headers: {
      "content-type": "application/json",
    },
    ...options,
  })

  if (!res.ok) {
    const { statusCode, message, error } = await res.json()
    const errorMessage = Array.isArray(message) ? message[0] : message

    return { data: errorMessage, success: false }
  }

  const text = await res.text()
  const data: T = text ? JSON.parse(text) : null
  return { data, success: true }
}
