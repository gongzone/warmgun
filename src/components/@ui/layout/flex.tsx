import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { tv, type VariantProps } from "tailwind-variants"

const flexVariants = tv(
  {
    variants: {
      display: {
        flex: "flex",
        "inline-flex": "inline-flex",
      },
      direction: {
        row: "flex-row",
        column: "flex-col",
        "row-reverse": "flex-row-reverse",
        "column-reverse": "flex-col-reverse",
      },
      justify: {
        start: "justify-start",
        center: "justify-center",
        end: "justify-end",
        between: "justify-between",
        around: "justify-around",
        evenly: "justify-evenly",
        stretch: "justify-stretch",
      },
      align: {
        start: "items-start",
        center: "items-center",
        end: "items-end",
        baseline: "items-baseline",
        stretch: "items-stretch",
      },
      wrap: {
        nowrap: "flex-nowrap",
        wrap: "flex-wrap",
        "wrap-reverse": "flex-wrap-reverse",
      },
      gap: {
        0: "gap-0",
        1: "gap-1",
        2: "gap-2",
        3: "gap-3",
        4: "gap-4",
        5: "gap-5",
        6: "gap-6",
        7: "gap-7",
        8: "gap-8",
        9: "gap-9",
        10: "gap-10",
        11: "gap-11",
        12: "gap-12",
      },
    },
    defaultVariants: {
      display: "flex",
    },
  },
  {
    responsiveVariants: ["sm", "md", "lg", "xl", "2xl"],
  }
)

type FlexElement = React.ElementRef<"div">
interface FlexProps
  extends React.ComponentPropsWithoutRef<"div">,
    VariantProps<typeof flexVariants> {
  asChild?: boolean
}

const Flex = React.forwardRef<FlexElement, FlexProps>(
  (
    {
      className,
      display,
      direction,
      justify,
      align,
      wrap,
      gap,
      asChild = false,
      ...props
    },
    forwardedRef
  ) => {
    const Comp = asChild ? Slot : "div"
    return (
      <Comp
        className={flexVariants({
          display,
          direction,
          justify,
          align,
          wrap,
          gap,
          className,
        })}
        ref={forwardedRef}
        {...props}
      />
    )
  }
)
Flex.displayName = "Flex"

export { Flex }
