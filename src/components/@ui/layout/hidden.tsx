import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { tv, type VariantProps } from "tailwind-variants"

const hiddenVariants = tv({
  variants: {
    whenShowUp: {
      sm: "hidden sm:block",
      md: "hidden md:block",
      lg: "hidden lg:block",
      xl: "hidden xl:block",
      "2xl": "hidden 2xl:block",
    },
    whenHide: {
      sm: "block sm:hidden",
      md: "block md:hidden",
      lg: "block lg:hidden",
      xl: "block xl:hidden",
      "2xl": "block 2xl:hidden",
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
  (
    { className, whenShowUp, whenHide, asChild = false, ...props },
    forwardedRef
  ) => {
    const Comp = asChild ? Slot : "div"
    const hiddenClasses =
      whenShowUp && whenHide
        ? hiddenVariants({ whenShowUp, className })
        : hiddenVariants({ whenShowUp, whenHide, className })
    return <Comp className={hiddenClasses} ref={forwardedRef} {...props} />
  }
)
Hidden.displayName = "Hidden"

export { Hidden }
