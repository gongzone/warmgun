import { json, type LoaderFunction } from '@remix-run/node'
import { Outlet } from '@remix-run/react'

import { authenticate } from '~/libs/session'
import { getMe } from '~/libs/api/user'

import MainLayout from '~/components/layout/MainLayout'

export const loader: LoaderFunction = async ({ request }) => {
  const accessToken = await authenticate(request, { requiredAuth: false })

  if (!accessToken) {
    return json({ user: null })
  }

  const me = await getMe(accessToken)

  return json({ user: me })
}

export default function DefaultLayout() {
  return (
    <MainLayout>
      <Outlet />
    </MainLayout>
  )
}
