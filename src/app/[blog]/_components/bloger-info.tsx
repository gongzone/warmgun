import Image from "next/image"

import { fetchOneUser } from "@/lib/services/user/fetch"
import { AspectRatio } from "@/components/@ui/aspect-ratio"
import { Avatar } from "@/components/@ui/avatar"
import { Badge } from "@/components/@ui/badge"
import { Button } from "@/components/@ui/button"
import { Card } from "@/components/@ui/card"
import { Icons } from "@/components/@ui/icons"
import { Text } from "@/components/@ui/text"

type BlogerInfoProps = {
  blogerUsername: string
}

export const BlogerInfo = async ({ blogerUsername }: BlogerInfoProps) => {
  const bloger = await fetchOneUser(blogerUsername)

  return (
    <div>
      <div className="relative">
        <AspectRatio ratio={16 / 4} className="bg-muted">
          {bloger?.profile?.blogImage ? (
            <Image
              src={bloger.profile.blogImage}
              alt="blog-image"
              fill
              sizes="100%"
              className="object-cover"
            />
          ) : null}
        </AspectRatio>
        <div className="absolute bottom-0 left-6 flex w-full translate-y-1/2 gap-3 pr-10 sm:left-10">
          <Avatar
            src={bloger?.profile?.avatar}
            alt={bloger?.profile?.displayName}
            size="5xl"
            border
          />
          <div className="flex w-full items-center justify-between self-end pr-6">
            <div></div>
            <div>
              <Button radius="full">
                <Icons.SmileFace className="h-4 w-4" />
                팔로우
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col px-10 pb-10 pt-20">
        <div className="mb-1.5 flex items-center gap-2">
          <Text size="2xl" weight={600}>
            {bloger?.profile?.displayName}
          </Text>
          <Badge variant="base">{bloger?.profile?.who}</Badge>
        </div>

        <div className="mb-3">
          <Text as="p">{bloger?.profile?.bio}</Text>
        </div>

        <div className="flex items-center gap-2">
          <div>
            <Text size="sm" weight={600} className="mr-1">
              {bloger?._count.followees}
            </Text>
            <Text size="sm">팔로워</Text>
          </div>
          <span>·</span>
          <div>
            <Text size="sm" weight={600} className="mr-1">
              {bloger?._count.followers}
            </Text>
            <Text size="sm">팔로잉</Text>
          </div>
          <span>·</span>
          <div>
            <Text size="sm" weight={600} className="mr-1">
              {bloger?._count.articles}
            </Text>
            <Text size="sm">아티클</Text>
          </div>
        </div>
      </div>
    </div>
  )
}
