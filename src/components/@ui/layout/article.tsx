import * as React from "react"
import { Slot } from "@radix-ui/react-slot"

type ArticleElement = React.ElementRef<"article">
interface ArticleProps extends React.ComponentPropsWithoutRef<"article"> {
  asChild?: boolean
}

const Article = React.forwardRef<ArticleElement, ArticleProps>(
  ({ className, asChild = false, ...props }, forwardedRef) => {
    const Comp = asChild ? Slot : "article"
    return <Comp className={className} ref={forwardedRef} {...props} />
  }
)
Article.displayName = "Article"

export { Article }
