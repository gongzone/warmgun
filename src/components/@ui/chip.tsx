import React from "react"
import { tv, type VariantProps } from "tailwind-variants"

const chipVariants = tv({
  base: "inline-flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap px-2 py-1.5 rounded-md transition-colors text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  variants: {
    variant: {
      default:
        "bg-background text-foreground-light border hover:border-foreground hover:text-foreground",
      base: "bg-foreground text-background border border-foreground hover:bg-foreground/90",
      "base-invert":
        "bg-foreground text-background border border-foreground hover:bg-background hover:text-foreground",
      "base-ghost":
        "bg-background text-foreground border border-foreground hover:bg-foreground hover:text-background",
      primary:
        "bg-primary text-primary-foreground border border-primary hover:bg-primary/90",
      "primary-invert":
        "bg-primary text-primary-foreground border border-primary hover:bg-background hover:text-primary-700",
      "primary-ghost":
        "bg-background text-primary-700 border border-primary hover:bg-primary hover:text-primary-foreground",
      success:
        "bg-success text-success-foreground border border-success hover:bg-success/90",
      "success-invert":
        "bg-success text-success-foreground border border-success hover:bg-background hover:text-success-700",
      "success-ghost":
        "bg-background text-success-700 border border-success hover:bg-success hover:text-success-foreground",
      warning:
        "bg-warning text-warning-foreground border border-warning hover:bg-warning/90",
      "warning-invert":
        "bg-warning text-warning-foreground border border-warning hover:bg-background hover:text-warning-700",
      "warning-ghost":
        "bg-background text-warning-700 border border-warning hover:bg-warning hover:text-warning-foreground",
      danger:
        "bg-danger text-danger-foreground border border-danger hover:bg-danger/90",
      "danger-invert":
        "bg-danger text-danger-foreground border border-danger hover:bg-background hover:text-danger-700",
      "danger-ghost":
        "bg-background text-danger-700 border border-danger hover:bg-danger hover:text-danger-foreground",
    },
  },
  defaultVariants: {
    variant: "default",
  },
})

type ChipProps = {} & React.ComponentPropsWithoutRef<"span"> &
  VariantProps<typeof chipVariants>

export const Chip = React.forwardRef<React.ElementRef<"span">, ChipProps>(
  ({ className, variant, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={chipVariants({ className, variant })}
        {...props}
      ></span>
    )
  }
)
Chip.displayName = "Chip"
