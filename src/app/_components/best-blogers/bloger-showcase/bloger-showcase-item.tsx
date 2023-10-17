import { type UserDisplay } from "@/lib/services/user/fetch"
import { Avatar } from "@/components/@ui/avatar"
import { Text } from "@/components/@ui/text"

type BloggerShocaseItemProps = {
  user: UserDisplay
}

export const BloggerShocaseItem = ({ user }: BloggerShocaseItemProps) => {
  return (
    <div className="h-[340px] w-full rounded-3xl bg-foreground shadow-md">
      <div className="px-6 pt-6">
        <Avatar src={user.profile?.avatar} size="xl" />
      </div>
      <div className="px-6 py-4">
        <div className="flex flex-col">
          <Text color="invert" weight={500} clamp={1}>
            {user.profile?.displayName}
          </Text>
          <Text className="text-background/75" size="sm" weight={300} clamp={1}>
            {user.profile?.who}
          </Text>
          <Text
            color="invert"
            size="sm"
            weight={300}
            className="pt-2"
            clamp={3}
          >
            {user.profile?.bio}
          </Text>
        </div>
      </div>
    </div>
  )
}
