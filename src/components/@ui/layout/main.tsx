import * as React from "react"
import { Slot } from "@radix-ui/react-slot"

type MainElement = React.ElementRef<"main">
interface MainProps extends React.ComponentPropsWithoutRef<"main"> {
  asChild?: boolean
}

const Main = React.forwardRef<MainElement, MainProps>(
  ({ className, asChild = false, ...props }, forwardedRef) => {
    const Comp = asChild ? Slot : "main"
    return <Comp className={className} ref={forwardedRef} {...props} />
  }
)
Main.displayName = "Main"

export { Main }
