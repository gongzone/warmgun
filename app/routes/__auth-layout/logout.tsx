import type { ActionFunction, LoaderFunction } from '@remix-run/node'
import { redirect } from '@remix-run/node'

import { logoutSession } from '~/libs/session'

export const loader: LoaderFunction = async () => {
  return redirect('/')
}

export const action: ActionFunction = async ({ request }) => {
  return logoutSession(request)
}
