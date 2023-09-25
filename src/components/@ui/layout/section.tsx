import * as React from "react"
import { Slot } from "@radix-ui/react-slot"

type SectionElement = React.ElementRef<"section">
interface SectionProps extends React.ComponentPropsWithoutRef<"section"> {
  asChild?: boolean
}

const Section = React.forwardRef<SectionElement, SectionProps>(
  ({ className, asChild = false, ...props }, forwardedRef) => {
    const Comp = asChild ? Slot : "section"
    return <Comp className={className} ref={forwardedRef} {...props} />
  }
)
Section.displayName = "Section"

export { Section }
