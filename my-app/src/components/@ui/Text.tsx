import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const textVariants = cva("", {
  variants: {
    size: {
      xs: "text-xs",
      sm: "text-sm",
      md: "text-base",
      lg: "text-lg",
      xl: "text-xl",
      "2xl": "text-2xl",
      "3xl": "text-3xl",
      "4xl": "text-4xl",
      "5xl": "text-5xl",
      "6xl": "text-6xl",
      "7xl": "text-7xl",
      "8xl": "text-8xl",
      "9xl": "text-9xl",
    },
    weight: {
      100: "font-thin",
      200: "font-extralight",
      300: "font-light",
      400: "font-normal",
      500: "font-medium",
      600: "font-semibold",
      700: "font-bold",
      800: "font-extrabold",
      900: "font-black",
    },
    italic: {
      true: "italic",
      false: "non-italic",
    },
    clamp: {
      none: "line-clamp-none",
      1: "line-clamp-1",
      2: "line-clamp-2",
      3: "line-clamp-3",
      4: "line-clamp-4",
      5: "line-clamp-5",
      6: "line-clamp-6",
    },
    breaking: {
      normal: "break-normal",
      words: "break-words",
      all: "break-all",
      keep: "break-keep",
    },
  },
  defaultVariants: {
    size: "md",
    weight: 400,
    italic: false,
  },
})

export interface TextProps
  extends React.HtmlHTMLAttributes<
      HTMLSpanElement | HTMLParagraphElement | HTMLHeadingElement
    >,
    VariantProps<typeof textVariants> {
  as?: "span" | "p" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
}

const Text = ({
  className,
  as,
  size,
  weight,
  italic,
  clamp,
  breaking,
  ...props
}: TextProps) => {
  const Comp = as ? as : "span"

  return (
    <Comp
      className={cn(
        textVariants({ size, weight, italic, clamp, breaking, className })
      )}
      {...props}
    />
  )
}

Text.displayName = "Text"

export { Text }
