"use client"

import React from "react"
import { experimental_useFormStatus as useFormStatus } from "react-dom"

import { Button, type ButtonProps } from "./button"

type SubmitUIButtonProps = {
  uiButton: true
} & ButtonProps

type SubmitNomalButtonProps = {
  uiButton: false
} & React.ComponentPropsWithoutRef<"button">

type SubmitButtonProps = SubmitUIButtonProps | SubmitNomalButtonProps

export const SubmitButton = React.forwardRef<
  React.ElementRef<"button">,
  SubmitButtonProps
>(
  (
    { uiButton = true, children, className, type = "submit", ...props },
    ref
  ) => {
    const { pending } = useFormStatus()

    if (uiButton) {
      return (
        <Button
          ref={ref}
          className={className}
          type={type}
          disabled={pending}
          aria-disabled={pending}
          {...props}
        >
          {children}
        </Button>
      )
    } else {
      return (
        <button
          ref={ref}
          className={className}
          type={type}
          disabled={pending}
          aria-disabled={pending}
          {...props}
        >
          {children}
        </button>
      )
    }
  }
)
SubmitButton.displayName = "SubmitButton"
