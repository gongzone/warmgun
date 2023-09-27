"use client"

import { signIn } from "next-auth/react"

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
    <Button
      variant="base-ghost"
      fullWidth
      radius="full"
      size="md"
      onClick={() => signIn(provider, { callbackUrl: "/" })}
    >
      {icon} {name}
    </Button>
  )
}
