import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { tv, type VariantProps } from "tailwind-variants"

const gridVariants = tv(
  {
    variants: {
      display: {
        grid: "grid",
        "inline-grid": "inline-grid",
      },
      rows: {
        0: "grid-rows-none",
        1: "grid-rows-1",
        2: "grid-rows-2",
        3: "grid-rows-3",
        4: "grid-rows-4",
        5: "grid-rows-5",
        6: "grid-rows-6",
      },
      columns: {
        0: "grid-cols-none",
        1: "grid-cols-1",
        2: "grid-cols-2",
        3: "grid-cols-3",
        4: "grid-cols-4",
        5: "grid-cols-5",
        6: "grid-cols-6",
        7: "grid-cols-7",
        8: "grid-cols-8",
        9: "grid-cols-9",
        10: "grid-cols-10",
        11: "grid-cols-11",
        12: "grid-cols-12",
      },
      justify: {
        start: "justify-items-start",
        center: "justify-items-center",
        end: "justify-items-end",
        stretch: "justify-items-stretch",
      },
      align: {
        start: "content-start",
        center: "content-center",
        end: "content-end",
        between: "content-between",
        around: "content-around",
        evenly: "content-evenly",
        baseline: "content-baseline",
        stretch: "content-stretch",
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
      gapX: {
        0: "gap-x-0",
        1: "gap-x-1",
        2: "gap-x-2",
        3: "gap-x-3",
        4: "gap-x-4",
        5: "gap-x-5",
        6: "gap-x-6",
        7: "gap-x-7",
        8: "gap-x-8",
        9: "gap-x-9",
        10: "gap-x-10",
        11: "gap-x-11",
        12: "gap-x-12",
      },
      gapY: {
        0: "gap-y-0",
        1: "gap-y-1",
        2: "gap-y-2",
        3: "gap-y-3",
        4: "gap-y-4",
        5: "gap-y-5",
        6: "gap-y-6",
        7: "gap-y-7",
        8: "gap-y-8",
        9: "gap-y-9",
        10: "gap-y-10",
        11: "gap-y-11",
        12: "gap-y-12",
      },
    },
    defaultVariants: {
      display: "grid",
    },
  },
  {
    responsiveVariants: ["sm", "md", "lg", "xl", "2xl"],
  }
)

type GridElement = React.ElementRef<"div">
interface GridProps
  extends React.ComponentPropsWithoutRef<"div">,
    VariantProps<typeof gridVariants> {
  asChild?: boolean
}

const Grid = React.forwardRef<GridElement, GridProps>(
  (
    {
      className,
      display,
      rows,
      columns,
      justify,
      align,
      gap,
      gapX,
      gapY,
      asChild = false,
      ...props
    },
    forwardedRef
  ) => {
    const Comp = asChild ? Slot : "div"
    return (
      <Comp
        className={gridVariants({
          display,
          rows,
          columns,
          justify,
          align,
          gap,
          gapX,
          gapY,
          className,
        })}
        ref={forwardedRef}
        {...props}
      />
    )
  }
)
Grid.displayName = "Grid"

export { Grid }
