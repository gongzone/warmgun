import React from "react"

type InputElement = React.ElementRef<"input">
interface HiddenFileInputProps
  extends React.ComponentPropsWithoutRef<"input"> {}

export const HiddenFileInput = React.forwardRef<
  InputElement,
  HiddenFileInputProps
>(({ className, ...props }, ref) => {
  return (
    <div className="h-0 w-0 overflow-hidden">
      <input type="file" className={className} ref={ref} {...props} />
    </div>
  )
})
HiddenFileInput.displayName = "HiddenFileInput"
