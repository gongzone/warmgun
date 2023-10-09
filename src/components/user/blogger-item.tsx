import { Avatar } from "@/components/@ui/avatar"

import { Badge } from "../@ui/badge"
import { Text } from "../@ui/text"

type BloggerItemProps = {
  username: string
  avatar: string
}

export const BloggerItem = ({ avatar, username }: BloggerItemProps) => {
  return (
    <div className="h-[340px] w-[273px] rounded-3xl bg-foreground shadow-md">
      <div className="px-6 pt-6">
        <Avatar src={avatar} size="xl" />
      </div>
      <div className="px-6 py-4">
        <div className="flex flex-col">
          <Text color="invert" weight={500}>
            {username}
          </Text>
          <Text className="text-background/75" size="sm" weight={300}>
            프론트엔드
          </Text>
          <Text color="invert" size="sm" weight={300} className="pt-2">
            현 세대를 통해 시대의 변화를 읽는 시대학자 & 출판계의 이단아
          </Text>
        </div>

        <div className="flex gap-2 pt-3">
          <Badge>Svelte</Badge>
          <Badge>Web</Badge>
          <Badge>일상</Badge>
        </div>
      </div>
    </div>
  )
}
