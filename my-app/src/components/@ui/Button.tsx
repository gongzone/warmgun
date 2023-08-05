"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded text-sm ring-offset-background transition-colors duration-[200ms] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground border hover:border-foreground",
        primary:
          "bg-primary text-primary-foreground border border-primary hover:bg-background hover:text-primary",
        "primary-invert":
          "bg-background text-primary border border-primary hover:bg-primary hover:text-primary-foreground",
        base: "bg-foreground text-background border border-foreground hover:bg-background hover:text-foreground",
        "base-invert":
          "bg-background text-foreground border border-foreground hover:bg-foreground hover:text-background",
        destructive:
          "bg-destructive text-destructive-foreground border border-destructive hover:bg-background hover:text-destructive",
        "destructive-invert":
          "bg-background text-destructive border border-destructive hover:bg-destructive hover:text-destructive-foreground",
        ghost:
          "border bg-background hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
