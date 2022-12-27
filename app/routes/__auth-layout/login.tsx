import MainLayout from '~/components/layout/MainLayout'
import AuthHeader from '~/components/layout/header/AuthHeader'
import LoginForm from '~/components/auth/login-form/LoginForm'
import { type ActionFunction, json, type LoaderFunction } from '@remix-run/node'
import { login } from '~/libs/api/auth'
import { extractError } from '~/libs/error'
import { createAuthSession, isAlreadyLogin } from '~/libs/session'

export const loader: LoaderFunction = async ({ request }) => {
  console.log('login loader 작동')

  return isAlreadyLogin(request, '/')
}

export default function LoginPage() {
  return <LoginForm />
}

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData()
  const username = formData.get('username')
  const password = formData.get('password')

  if (typeof username !== 'string' || typeof password !== 'string') return

  try {
    const { user, expiredDate, tokens } = await login({ username, password })

    return createAuthSession({
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
      expiredDate,
      redirectTo: '/',
    })
  } catch (err) {
    const error = extractError(err)

    return json({ error }, { status: error.statusCode })
  }
}
