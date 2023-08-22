import * as React from "react"
import { Slot } from "@radix-ui/react-slot"

type HeaderElement = React.ElementRef<"header">
interface HeaderProps extends React.ComponentPropsWithoutRef<"header"> {
  asChild?: boolean
}

const Header = React.forwardRef<HeaderElement, HeaderProps>(
  ({ className, asChild = false, ...props }, forwardedRef) => {
    const Comp = asChild ? Slot : "header"
    return <Comp className={className} ref={forwardedRef} {...props} />
  }
)
Header.displayName = "Header"

export { Header }
