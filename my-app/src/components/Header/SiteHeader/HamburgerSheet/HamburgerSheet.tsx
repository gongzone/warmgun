"use client"

import { useRef } from "react"
import Link from "next/link"

import { siteConfig } from "@/lib/site"
import { HamburgerIcon } from "@/components/@icons/HamburgerIcon"
import { LogoIcon } from "@/components/@icons/LogoIcon"
import { Button } from "@/components/@ui/Button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/@ui/Sheet"
import { VerticalNavItem } from "@/components/@ui/VerticalNavItem"

export function HamburgerSheet() {
  const sheetClose = useRef<HTMLButtonElement>(null)

  return (
    <Sheet>
      <SheetTrigger asChild className="md:hidden">
        <Button variant="ghost">
          <HamburgerIcon className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent position="left" size="content">
        <SheetHeader>
          <SheetTitle>
            <Link href="/" className="flex items-center gap-1">
              <LogoIcon />
              <span>Warmgun</span>
            </Link>
          </SheetTitle>
          <SheetDescription>개발 커뮤니티 & 블로그 서비스</SheetDescription>
        </SheetHeader>

        <nav className="py-7">
          <ul className="flex flex-col gap-2">
            {siteConfig.mainNav.map((item, index) => (
              <li key={index}>
                <SheetClose ref={sheetClose}>
                  <VerticalNavItem
                    className="min-w-[265px]"
                    title={item.title}
                    href={item.href}
                    Icon={item.Icon}
                    onClick={() => {
                      if (sheetClose.current) sheetClose.current.click()
                    }}
                  />
                </SheetClose>
              </li>
            ))}
          </ul>
        </nav>
      </SheetContent>
    </Sheet>
  )
}
