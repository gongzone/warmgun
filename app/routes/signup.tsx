import { json, LoaderFunction, type ActionFunction } from '@remix-run/node'

import { signup } from '~/libs/api/auth'

import MainLayout from '~/components/layout/MainLayout'
import AuthHeader from '~/components/layout/header/AuthHeader'
import SignupForm from '~/components/auth/signup-form/SignupForm'
import { extractError } from '~/libs/error'
import { createAuthSession, isAlreadyLogin } from '~/libs/session'

export default function SignupPage() {
  return (
    <MainLayout header={<AuthHeader />} p="24px">
      <SignupForm />
    </MainLayout>
  )
}

export const loader: LoaderFunction = async ({ request }) => {
  console.log('signup loader 작동')

  return isAlreadyLogin(request, '/')
}

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData()

  const username = formData.get('username')
  const password = formData.get('password')
  const confirmPassword = formData.get('confirmPassword')
  const email = formData.get('email')

  if (
    typeof username !== 'string' ||
    typeof password !== 'string' ||
    typeof confirmPassword !== 'string' ||
    typeof email !== 'string'
  )
    return null

  try {
    const { user, expiredDate, tokens } = await signup({
      username,
      password,
      confirmPassword,
      email,
    })

    return createAuthSession({
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
      expiredDate,
      redirectTo: '/',
    })
  } catch (err) {
    const error = extractError(err)

    return json(
      { error },
      {
        status: error.statusCode,
      },
    )
  }
}
