import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { tv, type VariantProps } from "tailwind-variants"

const containerVariants = tv(
  {
    base: "px-4",
    variants: {
      variant: {
        wide: "max-w-[1400px]",
        prose: "max-w-prose",
      },
      center: {
        true: "mx-auto",
      },
      ySpacing: {
        0: "py-0",
        1: "py-1",
        2: "py-2",
        3: "py-3",
        4: "py-4",
        5: "py-5",
        6: "py-6",
        7: "py-7",
        8: "py-8",
        9: "py-9",
        10: "py-10",
        11: "py-11",
        12: "py-12",
        14: "py-14",
        16: "py-16",
        20: "py-20",
        24: "py-24",
        28: "py-28",
        32: "py-32",
      },
    },
    defaultVariants: {
      variant: "wide",
      ySpacing: 0,
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
  (
    { className, variant, center, ySpacing, asChild = false, ...props },
    forwardedRef
  ) => {
    const Comp = asChild ? Slot : "div"
    return (
      <Comp
        className={containerVariants({ variant, center, ySpacing, className })}
        ref={forwardedRef}
        {...props}
      />
    )
  }
)
Container.displayName = "Container"

export { Container }
