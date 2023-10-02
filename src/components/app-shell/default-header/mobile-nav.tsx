"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { navs } from "@/lib/constants/navs"
import { site } from "@/lib/constants/site"
import { cn } from "@/lib/utils"
import { Button } from "@/components/@ui/button"
import { Icons } from "@/components/@ui/icons"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/@ui/sheet"
import { Text } from "@/components/@ui/text"
import { TextWithIcon } from "@/components/@ui/text-with-icon"

export const MobileNav = () => {
  const pathname = usePathname()

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button onlyIcon className="md:hidden">
          <Icons.Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[323px]">
        <SheetHeader>
          <SheetTitle asChild>
            <Link href="/">{site.title}</Link>
          </SheetTitle>
          <SheetDescription>
            Bring, Discover, Share Ideas & Stories
          </SheetDescription>
        </SheetHeader>

        <ul className="mt-6">
          {navs.main.map((nav) => (
            <li key={nav.name}>
              <SheetClose asChild>
                <Link href={nav.href}>
                  <TextWithIcon
                    icon={<nav.icon className="h-5 w-5" />}
                    text={
                      <Text color="inherit" weight={500}>
                        {nav.name}
                      </Text>
                    }
                    gap={2}
                    className={cn(
                      "flex py-1.5 text-foreground-light hover:text-foreground",
                      pathname === nav.href && "text-foreground"
                    )}
                  />
                </Link>
              </SheetClose>
            </li>
          ))}
        </ul>
        <SheetFooter></SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
