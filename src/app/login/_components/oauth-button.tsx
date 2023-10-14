import Link from "next/link"

import { buttonVariants } from "@/components/@ui/button"

import { type Social } from "../_lib/constants"

type OauthButtonProps = {
  social: Social
}

export const OauthButton = ({ social }: OauthButtonProps) => {
  const { provider, name, Icon } = social

  return (
    <Link
      className={buttonVariants({
        variant: "base-ghost",

        fullWidth: true,
        radius: "full",
      })}
      href={`/login/${provider}`}
    >
      <Icon className="h-5 w-5" /> {name}
    </Link>
  )
}
