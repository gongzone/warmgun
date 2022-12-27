import { Outlet } from '@remix-run/react'

import MainLayout from '~/components/layout/MainLayout'
import AuthHeader from '~/components/layout/header/AuthHeader'

export default function authLayout() {
  return (
    <MainLayout header={<AuthHeader />} p="24px">
      <Outlet />
    </MainLayout>
  )
}
