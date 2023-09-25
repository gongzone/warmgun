"use client"

import { login } from "@/lib/auth/handle"
import { Button } from "@/components/@ui/button"

interface OaithLoginButtonProps {
  provider: string
  name: string
  icon: JSX.Element
}

export const OauthLoginButton = ({
  provider,
  name,
  icon,
}: OaithLoginButtonProps) => {
  return (
    <Button fullWidth onClick={() => login(provider)}>
      {icon} {name} 로그인
    </Button>
  )
}
