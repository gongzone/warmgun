import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { tv, type VariantProps } from "tailwind-variants"

const hiddenVariants = tv({
  variants: {
    when: {
      sm: "hidden sm:block",
      md: "hidden md:block",
      lg: "hidden lg:block",
      xl: "hidden xl:block",
      "2xl": "hidden 2xl:block",
    },
  },
})

type HiddenElement = React.ElementRef<"div">
interface HiddenProps
  extends React.ComponentPropsWithoutRef<"div">,
    VariantProps<typeof hiddenVariants> {
  asChild?: boolean
}

const Hidden = React.forwardRef<HiddenElement, HiddenProps>(
  ({ className, when, asChild = false, ...props }, forwardedRef) => {
    const Comp = asChild ? Slot : "div"
    return (
      <Comp
        className={hiddenVariants({ when, className })}
        ref={forwardedRef}
        {...props}
      />
    )
  }
)
Hidden.displayName = "Hidden"

export { Hidden }
