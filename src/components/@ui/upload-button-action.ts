"use server"

import {
  createPresignedPost,
  type PresignedPostOptions,
} from "@aws-sdk/s3-presigned-post"
import mime from "mime-types"
import { nanoid } from "nanoid"

import { getServerSession } from "@/lib/auth"
import { s3Client } from "@/lib/s3"

const generatePresignedOptions = (key: string, contentType: string) => {
  return {
    Bucket: process.env.S3_BUCKET_NAME ?? "",
    Key: key,
    Conditions: [
      ["starts-with", "$Content-Type", "image/"], // only image
      ["content-length-range", 0, 10000000], // 0 - 10MB
    ],
    Fields: {
      "Content-Type": contentType,
    },
  } satisfies PresignedPostOptions
}

export async function uploadImageAction(contentType: string) {
  const session = await getServerSession("POST")

  if (!session?.user) {
    return // TODO: send 401 error or redirect login page
  }

  const key = `upload/${session.user.username}/${nanoid()}.${mime.extension(
    contentType
  )}`

  try {
    const presignedData = await createPresignedPost(
      s3Client,
      generatePresignedOptions(key, contentType)
    )

    return { presignedData }
  } catch {
    return // TODO: send Error
  }
}
