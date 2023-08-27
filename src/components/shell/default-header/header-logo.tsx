import Link from "next/link"

import { site } from "@/lib/constants/site"
import { Icons } from "@/components/@ui/icons"
import { Text } from "@/components/@ui/text"

const HeaderLogo = () => {
  return (
    <Link href="/" className="flex items-center gap-1">
      <Icons.Logo className="h-5 w-5" />
      <Text as="span" size="lg" weight={600}>
        {site.title}
      </Text>
    </Link>
  )
}

export { HeaderLogo }
