import Link from "next/link"

import { site } from "@/lib/constants/site"
import { TextWithIcon } from "@/components/@ui/text-with-icon"

export const HeaderLogo = () => {
  return (
    <Link href="/">
      <TextWithIcon
        icon={(Icons) => <Icons.Logo className="h-7 w-7 md:h-5 md:w-5" />}
        text={(Text) => (
          <Text as="span" size="lg" weight={600} className="hidden md:inline">
            {site.title}
          </Text>
        )}
      />
    </Link>
  )
}
