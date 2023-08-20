import * as React from "react"
import { Slot } from "@radix-ui/react-slot"

type FooterElement = React.ElementRef<"footer">
interface FooterProps extends React.ComponentPropsWithoutRef<"footer"> {
  asChild?: boolean
}

const Footer = React.forwardRef<FooterElement, FooterProps>(
  ({ className, asChild = false, ...props }, forwardedRef) => {
    const Comp = asChild ? Slot : "footer"
    return <Comp className={className} ref={forwardedRef} {...props} />
  }
)
Footer.displayName = "Footer"

export { Footer }
