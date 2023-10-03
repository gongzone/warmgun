"use client"

import React, { useCallback, useEffect, useMemo } from "react"
import { experimental_useFormStatus as useFormStatus } from "react-dom"

import { Button, type ButtonProps } from "./button"

type SubmitUIButtonProps = {
  uiButton?: true
  afterAction?: () => void
} & ButtonProps

type SubmitNomalButtonProps = {
  uiButton?: false
  afterAction?: () => void
} & React.ComponentPropsWithoutRef<"button">

type SubmitButtonProps = SubmitUIButtonProps | SubmitNomalButtonProps

export const SubmitButton = React.forwardRef<
  React.ElementRef<"button">,
  SubmitButtonProps
>(
  (
    {
      uiButton = true,
      afterAction,
      children,
      className,
      type = "submit",
      ...props
    },
    ref
  ) => {
    const { pending } = useFormStatus()

    useEffect(() => {
      console.log(pending)
      if (!pending && afterAction) {
        afterAction()
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
