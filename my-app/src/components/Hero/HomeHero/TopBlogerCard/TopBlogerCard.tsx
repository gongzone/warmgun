import React from "react"
import Link from "next/link"

import { Icons } from "@/components/ui/icons"
import { UserAvatar } from "@/components/ui-blocks/UserAvatar"

interface TopBlogerCardProps {
  username: string
  avatar: string | null
  field: string
  bio: string
  followedByCount: number
  followingCount: number
  articleCount: number
}

export function TopBlogerCard({
  username,
  avatar,
  field,
  bio,
  followedByCount,
  followingCount,
  articleCount,
  ...props
}: TopBlogerCardProps) {
  return (
    <div
      className="grid h-full min-h-[300px] w-full overflow-hidden rounded-lg shadow-xl"
      {...props}
    >
      <header className="grid grid-cols-3 items-center gap-8 bg-neutral-100 p-4 text-neutral-800">
        <div className="flex items-center justify-center">
          <UserAvatar
            src={avatar}
            alt={`${username}-avatar`}
            avatarClassName="w-14 h-14 min-[500px]:w-full min-[500px]:h-full min-[500px]:aspect-square min-[500px]:rounded-md"
            fallbackClassName="rounded-md"
          />
        </div>
        <div className="col-span-2 space-y-2">
          <UserProfile username={username} field={field} bio={bio} />
        </div>
      </header>

      <footer className="flex items-center justify-between bg-white p-6 text-neutral-800 sm:p-10">
        <div className="flex items-center gap-6 md:gap-10">
          <UserStatus title="구독자" count={followedByCount} />
          <UserStatus title="팔로잉" count={followingCount} />
          <UserStatus title="아티클" count={articleCount} />
        </div>
        <Link
          href={`/@${username}`}
          className="bg-background text-foreground hover:text-background rounded-full 
          border p-2 shadow-lg transition-colors duration-150 hover:border-neutral-500 hover:bg-white"
        >
          <Icons.arrowRightIn className="h-6 w-6" />
        </Link>
      </footer>
    </div>
  )
}

interface UserProfileProps {
  field: string
  username: string
  bio: string
}

function UserProfile({ field, username, bio }: UserProfileProps) {
  return (
    <>
      <span className="line-clamp-1 opacity-50 sm:text-lg">{field}</span>
      <span className="line-clamp-1 text-lg sm:text-2xl">{username}</span>
      <p className="line-clamp-2 break-all font-light sm:text-lg">{bio}</p>
    </>
  )
}

interface UserStatusProps {
  title: string
  count: number
}

function UserStatus({ title, count }: UserStatusProps) {
  return (
    <div className="flex flex-col">
      <span className="text-xs font-semibold sm:text-sm">{title}</span>
      <span className="text-sm font-light">{count}</span>
    </div>
  )
}
