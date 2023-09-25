import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { tv, type VariantProps } from "tailwind-variants"

const textVariants = tv(
  {
    variants: {
      family: {
        default: "font-sans",
        heading: "font-heading",
      },
      color: {
        default: "text-foreground",
        light: "text-foreground-light",
        invert: "text-background",
        primary: "text-primary-600",
        success: "text-success-600",
        warning: "text-warning-600",
        danger: "text-danger-600",
      },
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
      align: {
        left: "text-left",
        center: "text-center",
        right: "text-right",
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
      hover: {
        true: "transition-colors cursor-pointer",
      },
    },
    compoundVariants: [
      {
        color: "light",
        hover: true,
        className: "hover:text-foreground",
      },
    ],
    defaultVariants: {
      family: "default",
      color: "default",
      size: "md",
      weight: 400,
      italic: false,
      hover: false,
    },
  },
  {
    responsiveVariants: ["sm", "md", "lg", "xl", "2xl"],
  }
)

type TextElement = React.ElementRef<"span">
type TextAsChildProps = {
  asChild?: boolean
  as?: never
} & React.ComponentPropsWithoutRef<"span">
type TextSpanProps = {
  as?: "span"
  asChild?: never
} & React.ComponentPropsWithoutRef<"span">
type TextDivProps = {
  as?: "div"
  asChild?: never
} & React.ComponentPropsWithoutRef<"div">
type TextPProps = {
  as?: "p"
  asChild?: never
} & React.ComponentPropsWithoutRef<"p">
type TextHeadingProps = {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
  asChild?: never
} & React.ComponentPropsWithoutRef<"h1">

type TextProps = VariantProps<typeof textVariants> &
  (
    | TextAsChildProps
    | TextSpanProps
    | TextDivProps
    | TextPProps
    | TextHeadingProps
  )

const Text = React.forwardRef<TextElement, TextProps>(
  (
    {
      children,
      className,
      as: Tag = "span",
      asChild = false,
      family,
      color,
      size,
      weight,
      italic,
      align,
      clamp,
      breaking,
      hover,
      ...props
    },
    forwardedRef
  ) => {
    return (
      <Slot
        ref={forwardedRef}
        className={textVariants({
          family,
          color,
          size,
          weight,
          italic,
          align,
          clamp,
          breaking,
          hover,
          className,
        })}
        {...props}
      >
        {asChild ? children : <Tag>{children}</Tag>}
      </Slot>
    )
  }
)
Text.displayName = "Text"

export { Text, textVariants }
