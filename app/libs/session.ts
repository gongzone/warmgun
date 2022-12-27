import { createCookieSessionStorage, json, redirect } from '@remix-run/node'
import { refresh } from './api/auth'

let sessionSecret = process.env.JWT_SECRET_KEY
if (!sessionSecret) throw new Error('SESSION_SECRET must be set')

export const storage = createCookieSessionStorage({
  // a Cookie from `createCookie` or the CookieOptions to create one
  cookie: {
    name: 'GZ_session',

    // all of these are optional
    // domain: 'remix.run',
    // Expires can also be set (although maxAge overrides it when used in combination).
    // Note that this method is NOT recommended as `new Date` creates only one date on each server deployment, not a dynamic date in the future!
    //
    // expires: new Date(Date.now() + 60_000),
    httpOnly: true,
    maxAge: 60 * 60 * 24,
    path: '/',
    sameSite: 'lax',
    secrets: [sessionSecret],
    secure: process.env.NODE_ENV === 'production' ? true : false,
  },
})

async function getAuthSession(request: Request) {
  const session = await storage.getSession(request.headers.get('Cookie'))
  const accessToken = session.get('access_token')
  const refreshToken = session.get('refresh_token')
  const expiredDate = session.get('expired_date')

  return { accessToken, refreshToken, expiredDate, session }
}

interface AuthSession {
  accessToken: string
  refreshToken: string
  expiredDate: string
  redirectTo?: string
}

export async function createAuthSession({
  accessToken,
  refreshToken,
  expiredDate,
  redirectTo,
}: AuthSession) {
  const session = await storage.getSession()
  session.set('access_token', accessToken)
  session.set('refresh_token', refreshToken)
  session.set('expired_date', expiredDate)

  if (!redirectTo) {
    return await storage.commitSession(session)
  }

  return redirect(redirectTo, {
    headers: {
      'Set-Cookie': await storage.commitSession(session),
    },
  })
}

export async function isAlreadyLogin(request: Request, redirectTo?: string) {
  const { accessToken } = await getAuthSession(request)

  if (!redirectTo) return accessToken ? true : false

  return accessToken ? redirect(redirectTo) : null
}

export async function logoutSession(request: Request) {
  const { session } = await getAuthSession(request)

  return redirect('/', {
    headers: {
      'Set-Cookie': await storage.destroySession(session),
    },
  })
}

interface RefreshAuthConfig {
  headers?: Headers
  requiredAuth?: boolean
}

export async function authenticate(
  request: Request,
  config: RefreshAuthConfig = { headers: new Headers(), requiredAuth: false },
) {
  const { accessToken, refreshToken, expiredDate } = await getAuthSession(request)
  const { headers, requiredAuth } = config

  console.log('refresh Auth 작동')

  if (!accessToken) {
    if (requiredAuth) throw redirect('/login')
    else return null
  }

  // 액세스 토큰 유효기간이 경과하지 않았다면 즉시 accessToken return
  if (new Date(expiredDate) >= new Date()) return accessToken

  // 만약 유효 기간이 경과하였다면 refresh 작업 수행
  const refreshData = await refresh({ refreshToken })

  headers?.append(
    'Set-Cookie',
    (await createAuthSession({
      accessToken: refreshData.accessToken,
      refreshToken: refreshData.refreshToken,
      expiredDate: refreshData.expiredDate,
    })) as string,
  )

  // loader의 경우 리다이렉트
  if (request.method === 'GET') throw redirect(request.url, { headers })

  return refreshData.accessToken
}
