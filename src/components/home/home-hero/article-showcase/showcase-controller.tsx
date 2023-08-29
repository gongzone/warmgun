"use client"

import { startTransition } from "react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/@ui/button"
import { Icons } from "@/components/@ui/icons"

import { useShowcase } from "./showcase-context"

interface ShowcaseControllerProps {
  className?: string
  itemLength: number
}

const ShowcaseController = ({
  className,
  itemLength,
}: ShowcaseControllerProps) => {
  const [currentIndex, setCurrentIndex] = useShowcase()

  const moveIndex = (to: number) =>
    startTransition(() => {
      setCurrentIndex(to)
    })

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <Button
        variant="base-invert"
        size="sm"
        onlyIcon
        disabled={currentIndex === 0 ? true : false}
        onClick={() => moveIndex(currentIndex - 1)}
      >
        <Icons.ChevronLeft className="h-4 w-4" />
      </Button>
      <ul className="flex gap-3">
        {Array.from({ length: itemLength }).map((_, i) => (
          <li key={i}>
            <div
              className={cn(
                "h-2 w-2 rounded-full transition-colors ease-in-out",
                i === currentIndex ? "bg-foreground" : "bg-foreground/25"
              )}
            />
          </li>
        ))}
      </ul>
      <Button
        variant="base-invert"
        size="sm"
        onlyIcon
        disabled={currentIndex === itemLength - 1 ? true : false}
        onClick={() => moveIndex(currentIndex + 1)}
      >
        <Icons.ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  )
}

export { ShowcaseController }
