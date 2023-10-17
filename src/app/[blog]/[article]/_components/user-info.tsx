import { type ArticleDetail } from "@/lib/services/article/fetch"
import { Avatar } from "@/components/@ui/avatar"
import { Badge } from "@/components/@ui/badge"
import { Button } from "@/components/@ui/button"
import { Card } from "@/components/@ui/card"
import { Icons } from "@/components/@ui/icons"
import { Text } from "@/components/@ui/text"

type UserInfoProps = {
  user: ArticleDetail["user"]
}

export const UserInfo = ({ user }: UserInfoProps) => {
  return (
    <div className="flex justify-between border-y py-10">
      <div className="flex gap-4">
        <Avatar src={user.profile?.avatar} size="3xl" />
        <div className="flex flex-col">
          <Text size="sm">{user.profile?.who}</Text>
          <Text size="xl" weight={700}>
            {user.profile?.displayName}
          </Text>

          <div className="mt-1.5 flex items-center gap-1.5">
            <Badge variant="base">구독자 {user._count.followees}</Badge>
            <Badge variant="base">아티클 {user._count.articles}</Badge>
          </div>

          <div className="mt-4">
            <Text>{user.profile?.bio}</Text>
          </div>
        </div>
      </div>

      <div>
        <Button radius="full">
          <Icons.SmileFace className="h-4 w-4" />
          팔로우
        </Button>
      </div>
    </div>
  )
}
