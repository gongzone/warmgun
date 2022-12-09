import MainLayout from '~/components/layout/MainLayout'
import AuthHeader from '~/components/layout/header/AuthHeader'

export default function AuthPage() {
  return <MainLayout header={<AuthHeader />}>Auth Page</MainLayout>
}
