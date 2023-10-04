"use client"

import React, { useRef, useTransition } from "react"

import { Button, type ButtonProps } from "./button"
import { uploadImageAction } from "./upload-button-action"

type UploadButtonProps = {
  afterUploadImage: (image: string) => void
} & ButtonProps

export const UploadButton = React.forwardRef<
  React.ElementRef<"button">,
  UploadButtonProps
>(({ className, children, afterUploadImage, ...props }, ref) => {
  const fileRef = useRef<HTMLInputElement>(null)
  const [isPending, startTransition] = useTransition()

  const uploadImage = async (file: File) => {
    startTransition(async () => {
      const data = await uploadImageAction(file.type)

      if (!data) {
        return
      }

      const presignedData = data.presignedData

      const formData = new FormData()
      Object.keys(presignedData.fields).forEach((key) => {
        formData.append(key, presignedData.fields[key])
      })
      formData.append("file", file)

      await fetch(presignedData.url, {
        method: "POST",
        body: formData,
      })

      afterUploadImage(
        `${process.env.NEXT_PUBLIC_CDN_DOMAIN}/${presignedData.fields["key"]}`
      )
    })
  }

  return (
    <>
      <Button
        className={className}
        ref={ref}
        onClick={() => {
          if (fileRef && fileRef.current) {
            fileRef.current.click()
          }
        }}
        disabled={isPending}
        aria-disabled={isPending}
        {...props}
      >
        {children}
      </Button>
      <div className="h-0 w-0 overflow-hidden">
        <input
          ref={fileRef}
          type="file"
          className={className}
          accept="image/*"
          onChange={async (e) => {
            if (!e.target.files) {
              return
            }

            const file = e.target.files[0]
            await uploadImage(file)
          }}
        />
      </div>
    </>
  )
})
UploadButton.displayName = "UploadButton"
