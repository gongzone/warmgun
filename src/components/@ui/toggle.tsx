"use client"

import * as React from "react"
import * as TogglePrimitive from "@radix-ui/react-toggle"
import { tv, type VariantProps } from "tailwind-variants"

import { cn } from "@/lib/utils"

const toggleVariants = tv({
  base: "inline-flex items-center justify-center text-sm font-medium ring-offset-background transition-colors hover:text-amber-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground",
  variants: {
    variant: {
      default: "bg-transparent",
      outline:
        "border border-input bg-transparent hover:bg-accent hover:text-accent-foreground",
    },
    size: {
      default: "h-10 px-3",
      xs: "h-8 px-2",
      sm: "h-9 px-2.5",
      lg: "h-11 px-5",
    },
    radius: {
      default: "rounded",
      sm: "rounded-sm",
      md: "rounded-md",
      lg: "rounded-lg",
      xl: "rounded-xl",
      "2xl": "rounded-2xl",
      "3xl": "rounded-3xl",
      full: "rounded-full",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
    radius: "default",
  },
})

const Toggle = React.forwardRef<
  React.ElementRef<typeof TogglePrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root> &
    VariantProps<typeof toggleVariants>
>(({ className, variant, size, radius, ...props }, ref) => (
  <TogglePrimitive.Root
    ref={ref}
    className={cn(toggleVariants({ variant, size, radius, className }))}
    {...props}
  />
))

Toggle.displayName = TogglePrimitive.Root.displayName

export { Toggle, toggleVariants }
