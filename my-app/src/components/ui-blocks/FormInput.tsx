import React from "react"
import { LucideIcon, LucideProps } from "lucide-react"

import { Input } from "../ui/input"

export interface FormInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  labelText?: string
  helperText?: string
}

const FormInput = React.forwardRef<HTMLInputElement, FormInputProps>(
  (
    { className, type, placeholder, name, labelText, helperText, ...props },
    ref
  ) => {
    return (
      <label className="space-y-2" htmlFor={name}>
        {labelText && <span className="text-sm opacity-75">{labelText}</span>}

        <Input
          type={type}
          placeholder={placeholder}
          className={className}
          ref={ref}
          name={name}
          id={name}
          {...props}
        />

        {helperText && <p className="text-sm opacity-75">{helperText}</p>}
      </label>
    )
  }
)
FormInput.displayName = "FormInput"

export { FormInput }
