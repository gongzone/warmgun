import * as React from "react"
import { Slot } from "@radix-ui/react-slot"

type AsideElement = React.ElementRef<"aside">
interface AsideProps extends React.ComponentPropsWithoutRef<"aside"> {
  asChild?: boolean
}

const Aside = React.forwardRef<AsideElement, AsideProps>(
  ({ className, asChild = false, ...props }, forwardedRef) => {
    const Comp = asChild ? Slot : "aside"
    return <Comp className={className} ref={forwardedRef} {...props} />
  }
)
Aside.displayName = "Aside"

export { Aside }
