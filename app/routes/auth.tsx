import MainLayout from '~/components/layout/MainLayout'
import AuthHeader from '~/components/layout/header/AuthHeader'
import AuthForm from '~/components/auth/auth-form/AuthForm'

export default function AuthPage() {
  return (
    <MainLayout header={<AuthHeader />} p="24px">
      <AuthForm />
    </MainLayout>
  )
}
