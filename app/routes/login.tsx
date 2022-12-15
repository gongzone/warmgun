import MainLayout from '~/components/layout/MainLayout'
import AuthHeader from '~/components/layout/header/AuthHeader'
import LoginForm from '~/components/auth/login-form/LoginForm'
import { type ActionFunction, json } from '@remix-run/node'
import { login } from '~/libs/api/auth'

export default function LoginPage() {
  return (
    <MainLayout header={<AuthHeader />} p="24px">
      <LoginForm />
    </MainLayout>
  )
}

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData()
  const username = formData.get('username')
  const password = formData.get('password')

  console.log(username, password)

  if (typeof username !== 'string' || typeof password !== 'string') return

  const { result, headers } = await login({ username, password })

  return json(result, {
    headers,
  })
}
