import React, { PropsWithChildren } from "react"

import { cn } from "@/lib/utils"
import { Button, type ButtonProps } from "@/components/@ui/button"
import { Icons } from "@/components/@ui/icons"

type DotButtonProps = {
  selected: boolean
  onClick: () => void
}

export const DotButton = ({ selected, onClick }: DotButtonProps) => {
  return (
    <button
      type="button"
      className={cn(
        "h-2 w-2 rounded-full transition-colors ease-in-out",
        selected ? "bg-foreground" : "bg-foreground/50"
      )}
      onClick={onClick}
    ></button>
  )
}

export const PrevButton = (props: ButtonProps) => {
  return (
    <Button onlyIcon type="button" {...props}>
      <Icons.ChevronLeft className="h-4 w-4" />
    </Button>
  )
}

export const NextButton = (props: ButtonProps) => {
  return (
    <Button onlyIcon type="button" {...props}>
      <Icons.ChevronRight className="h-4 w-4" />
    </Button>
  )
}
