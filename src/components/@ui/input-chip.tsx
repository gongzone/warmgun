"use client"

import React, { FormEvent, useState } from "react"
import { X } from "lucide-react"

import { Chip } from "./chip"
import { Input } from "./input"

type InvalidType =
  | "EMPTY_INPUT"
  | "VALIDATE_FAIL"
  | "MAXCHIPS_FAIL"
  | "DUPLICATE_FAIL"

type InputChipProps = {
  onAdd?: (chip: string) => void
  onRemove?: (chip: string) => void
  onInvalid?: (type: InvalidType) => void
  validate?: (chip: string) => boolean
  maxChips?: number
  allowDuplicates?: boolean
  format?: (chip: string) => string
} & React.ComponentPropsWithRef<"input">

export const InputChip = React.forwardRef<
  React.ElementRef<"input">,
  InputChipProps
>(
  (
    {
      className,
      type = "text",
      placeholder,
      onAdd,
      onRemove,
      onInvalid,
      validate: customValidate,
      maxChips = -1,
      allowDuplicates = false,
      format,
      ...props
    },
    ref
  ) => {
    const [inputState, setInputState] = useState<string>("")
    const [chipsState, setChipsState] = useState<
      { id: number; value: string }[]
    >([])

    const validate = (
      input: string
    ):
      | { state: false; type: InvalidType }
      | { state: true; type: "SUCCESS" } => {
      if (!input) return { state: false, type: "EMPTY_INPUT" }

      const chipValues = chipsState.map(({ value }) => value)

      if (customValidate !== undefined && !customValidate(input))
        return { state: false, type: "VALIDATE_FAIL" }

      if (maxChips !== -1 && chipValues.length >= maxChips)
        return { state: false, type: "MAXCHIPS_FAIL" }

      if (allowDuplicates === false && chipValues.includes(input))
        return { state: false, type: "DUPLICATE_FAIL" }

      return { state: true, type: "SUCCESS" }
    }

    const addChip = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()

      const fomattedInput = format
        ? format(inputState.trim())
        : inputState.trim()

      const validated = validate(fomattedInput)

      if (!validated.state) {
        if (onInvalid) {
          onInvalid(validated.type)
        }
        return
      }

      setChipsState((prev) => [
        ...prev,
        { id: Math.random(), value: fomattedInput },
      ])

      if (onAdd) {
        onAdd(inputState)
      }

      setInputState("")
    }

    const removeChip = (chipId: number, value: string) => {
      setChipsState((prev) => prev.filter(({ id }) => id !== chipId))

      if (onRemove) {
        onRemove(value)
      }
    }

    return (
      <div>
        <form onSubmit={addChip}>
          <Input
            ref={ref}
            className={className}
            type={type}
            placeholder={placeholder}
            value={inputState}
            onInput={(e) => setInputState(e.currentTarget.value)}
            {...props}
          />
        </form>
        <ul className="mt-3 flex flex-wrap items-center gap-2">
          {chipsState.map(({ id, value }) => (
            <li key={id}>
              <Chip onClick={() => removeChip(id, value)}>
                {value} <X className="h-3 w-3" />
              </Chip>
            </li>
          ))}
        </ul>
      </div>
    )
  }
)
InputChip.displayName = "InputChip"
