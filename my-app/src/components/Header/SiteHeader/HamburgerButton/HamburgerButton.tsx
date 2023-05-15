"use client"

import { HamburgerIcon } from "@/components/@icons/HamburgerIcon"
import { Button } from "@/components/@ui/Button"

export function HamburgerButton() {
  return (
    <Button variant="icon">
      <HamburgerIcon className="h-6 w-6" />
    </Button>
  )
}
