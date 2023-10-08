"use client"

import Image from "next/image"

import { AspectRatio } from "@/components/@ui/aspect-ratio"
import { Button } from "@/components/@ui/button"
import { Icons } from "@/components/@ui/icons"
import { UploadButton } from "@/components/@ui/upload-button"

import { useWriteContext } from "../_lib/store"

export const ThumbnailPreview = () => {
  const thumbnail = useWriteContext((state) => state.thumbnail)
  const updateThumbnail = useWriteContext((state) => state.updateThumbnail)

  return (
    <AspectRatio ratio={16 / 10} className="relative border shadow-sm">
      {!thumbnail ? (
        <div className="flex h-full w-full items-center justify-center">
          <UploadButton
            variant="base"
            radius="full"
            size="sm"
            afterUploadImage={(image) => updateThumbnail(image)}
          >
            이미지 업로드
          </UploadButton>
        </div>
      ) : (
        <>
          <Image
            src={thumbnail}
            alt="thumbnail"
            fill
            className="rounded-md object-cover"
          />
          <Button
            className="absolute right-0"
            onlyIcon
            onClick={() => updateThumbnail(null)}
          >
            <Icons.Trash className="h-5 w-5" />
          </Button>
        </>
      )}
    </AspectRatio>
  )
}
