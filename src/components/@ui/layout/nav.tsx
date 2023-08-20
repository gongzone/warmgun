import * as React from "react"
import { Slot } from "@radix-ui/react-slot"

type NavElement = React.ElementRef<"nav">
interface NavProps extends React.ComponentPropsWithoutRef<"nav"> {
  asChild?: boolean
}

const Nav = React.forwardRef<NavElement, NavProps>(
  ({ className, asChild = false, ...props }, forwardedRef) => {
    const Comp = asChild ? Slot : "nav"
    return <Comp className={className} ref={forwardedRef} {...props} />
  }
)
Nav.displayName = "Nav"

export { Nav }
