import * as React from "react"
import { Slot } from "@radix-ui/react-slot"

type BoxElement = React.ElementRef<"div">
interface BoxProps extends React.ComponentPropsWithoutRef<"div"> {
  asChild?: boolean
}

const Box = React.forwardRef<BoxElement, BoxProps>(
  ({ className, asChild = false, ...props }, forwardedRef) => {
    const Comp = asChild ? Slot : "div"
    return <Comp className={className} ref={forwardedRef} {...props} />
  }
)
Box.displayName = "Box"

export { Box }
