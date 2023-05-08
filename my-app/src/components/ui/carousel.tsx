"use client"

import React, {
  Children,
  ReactElement,
  cloneElement,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react"

import { cn } from "@/lib/utils"

import { Button } from "./button"
import { Icons } from "./icons"

export const Carousel = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  const [activeItem, setActiveItem] = useState(0)

  const items = useMemo(
    () =>
      Children.map(children as ReactElement[], (child: ReactElement) =>
        cloneElement(child, {
          className: cn(child.props.className),
        })
      ),
    [children]
  )

  const goto = useCallback(
    (index: number) => {
      if (!items) return

      if (index === items.length) {
        setActiveItem(0)
      } else if (index === -1) {
        setActiveItem(items.length - 1)
      } else {
        setActiveItem(index)
      }
    },
    [items]
  )

  useEffect(() => {
    const intervalId = setInterval(() => {
      goto(activeItem + 1)
    }, 3500)

    return () => clearInterval(intervalId)
  }, [activeItem, items, goto])

  return (
    <div ref={ref} className={cn(className)} {...props}>
      {items?.map((item, index) => (
        <div
          className={cn(
            "duration-800 w-full transition-all ease-in-out",
            `${
              activeItem === index
                ? "visible opacity-100"
                : "pointer-events-none invisible absolute top-0 translate-x-4 translate-y-6 opacity-0"
            }`
          )}
          key={index}
        >
          {item}
        </div>
      ))}
      <div className="grid w-full grid-cols-[15%_70%_15%] items-center px-0 py-4 sm:px-4 lg:absolute">
        <Button className="rounded-full" onClick={() => goto(activeItem - 1)}>
          <Icons.arrowLeft />
        </Button>
        <div className="flex w-full items-center justify-between px-4 md:px-8">
          {Array.from({ length: items.length }).map((_, index) => (
            <div
              className={cn(
                "hover:bg-foreground h-2 w-2 cursor-pointer rounded-full transition-colors duration-200 ease-in",
                `${activeItem === index ? "bg-foreground" : "bg-foreground/50"}`
              )}
              key={index}
              onClick={() => goto(index)}
            ></div>
          ))}
        </div>
        <Button className="rounded-full" onClick={() => goto(activeItem + 1)}>
          <Icons.ArrowRight />
        </Button>
      </div>
    </div>
  )
})

Carousel.displayName = "Carousel"

const CarouselBottom = () => {
  return (
    <div className="grid w-full grid-cols-[15%_70%_15%] items-center px-0 py-4 sm:px-4 lg:absolute"></div>
  )
}
