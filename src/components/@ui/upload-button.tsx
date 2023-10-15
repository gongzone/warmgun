"use client"

import React, { useRef, useTransition } from "react"
import { Loader2 } from "lucide-react"

import { Button, type ButtonProps } from "./button"
import { uploadImageAction } from "./upload-button-action"

type UploadButtonProps = {
  afterUploadImage?: (image: string) => void
  hidden?: boolean
} & ButtonProps

export const UploadButton = React.forwardRef<
  React.ElementRef<"button">,
  UploadButtonProps
>(({ className, children, afterUploadImage, hidden, ...props }, ref) => {
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

      if (afterUploadImage) {
        afterUploadImage(
          `${process.env.NEXT_PUBLIC_CDN_DOMAIN}/${presignedData.fields["key"]}`
        )
      }
    })
  }

  return (
    <>
      {!hidden ? (
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
          {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
          {children}
        </Button>
      ) : (
        <div className="h-0 w-0 overflow-hidden">
          <button
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
          </button>
        </div>
      )}
      <div className="h-0 w-0 overflow-hidden">
        <input
          ref={fileRef}
          type="file"
          className={className}
          accept="image/*"
          onClick={(e) => {
            e.currentTarget.value = ""
          }}
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
