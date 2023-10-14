"use client"

import React, { useEffect } from "react"
import { experimental_useFormStatus as useFormStatus } from "react-dom"

import { Button, type ButtonProps } from "./button"

type SubmitUIButtonProps = {
  uiButton?: true
  onPending: () => void
} & ButtonProps

type SubmitNomalButtonProps = {
  uiButton?: false
  onPending?: () => void
} & React.ComponentPropsWithoutRef<"button">

type SubmitButtonProps = SubmitUIButtonProps | SubmitNomalButtonProps

export const SubmitButton = React.forwardRef<
  React.ElementRef<"button">,
  SubmitButtonProps
>(
  (
    {
      uiButton = true,
      onPending,
      children,
      className,
      type = "submit",
      ...props
    },
    ref
  ) => {
    const { pending } = useFormStatus()

    useEffect(() => {
      if (pending && onPending && typeof onPending === "function") {
        onPending()
      }
    }, [pending])

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
