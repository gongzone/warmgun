type ParsedCookie = {
  [key: string]: string
}

export function parseCookie(cookie: string | string[] | null) {
  if (!cookie) return {}

  const newCookie = typeof cookie === 'string' ? cookie.split(';') : cookie

  return newCookie
    .map((v) => v.split('='))
    .reduce((acc: ParsedCookie, v) => {
      acc[decodeURIComponent(v[0].trim())] = decodeURIComponent(v[1].trim())
      return acc
    }, {})
}

export function createCookieHeaders(cookieHeader: string[] | undefined) {
  const headers = new Headers()

  if (!cookieHeader) return headers

  cookieHeader.forEach((cookie) => {
    headers.append('Set-Cookie', cookie)
  })

  return headers
}
