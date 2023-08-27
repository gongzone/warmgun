import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { tv, type VariantProps } from "tailwind-variants"

const buttonVariants = tv(
  {
    base: "inline-flex items-center justify-center gap-2 ring-offset-background transition-colors duration-[250ms] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
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
      size: {
        sm: "text-sm h-9 px-3",
        md: "text-base h-10 px-4",
        lg: "text-base h-12 px-6",
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
      onlyIcon: {
        true: "px-0",
      },
      fullWidth: {
        true: "w-full",
      },
    },
    compoundVariants: [
      {
        size: "sm",
        onlyIcon: true,
        fullWidth: false,
        className: "w-9 min-w-9",
      },
      {
        size: "md",
        onlyIcon: true,
        fullWidth: false,
        className: "w-10 min-w-10",
      },
      {
        size: "lg",
        onlyIcon: true,
        fullWidth: false,
        className: "w-12 min-w-12",
      },
    ],
    defaultVariants: {
      variant: "default",
      size: "md",
      radius: "default",
      onlyIcon: false,
      fullWidth: false,
    },
  },
  {
    responsiveVariants: ["sm", "md", "lg", "xl", "2xl"],
  }
)

type ButtonElement = React.ElementRef<"button">
interface ButtonProps
  extends React.ComponentPropsWithoutRef<"button">,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<ButtonElement, ButtonProps>(
  (
    {
      className,
      asChild = false,
      variant,
      size,
      radius,
      onlyIcon,
      fullWidth,
      ...props
    },
    forwardedRef
  ) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        ref={forwardedRef}
        className={buttonVariants({
          variant,
          size,
          radius,
          onlyIcon,
          fullWidth,
          className,
        })}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
