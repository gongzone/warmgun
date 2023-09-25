import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { tv, type VariantProps } from "tailwind-variants"

const containerVariants = tv(
  {
    base: "px-4 sm:px-8",
    variants: {
      variant: {
        wide: "max-w-[1400px]",
        prose: "max-w-prose",
      },
      center: {
        true: "mx-auto",
      },
    },
    defaultVariants: {
      variant: "wide",
      center: true,
    },
  },
  {
    responsiveVariants: ["sm", "md", "lg", "xl", "2xl"],
  }
)

type ContainerElement = React.ElementRef<"div">
interface ContainerProps
  extends React.ComponentPropsWithoutRef<"div">,
    VariantProps<typeof containerVariants> {
  asChild?: boolean
}

const Container = React.forwardRef<ContainerElement, ContainerProps>(
  ({ className, variant, center, asChild = false, ...props }, forwardedRef) => {
    const Comp = asChild ? Slot : "div"
    return (
      <Comp
        className={containerVariants({ variant, center, className })}
        ref={forwardedRef}
        {...props}
      />
    )
  }
)
Container.displayName = "Container"

export { Container }
