import Link from "next/link"

import { meta } from "@/lib/constants/meta"
import { Icons } from "@/components/@ui/Icons"
import { Text } from "@/components/@ui/Text"

const HeaderLogo = () => {
  return (
    <Link href="/" className="flex items-center gap-2">
      <Icons.Logo className="h-6 w-6" />
      <Text weight={600} className="hidden md:block">
        {meta.title}
      </Text>
    </Link>
  )
}

export { HeaderLogo }
