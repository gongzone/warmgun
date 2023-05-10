import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Icons } from "@/components/ui/icons"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Separator } from "@/components/ui/seperator"
import { UserAvatar } from "@/components/ui-blocks/UserAvatar"

interface AvatarPopoverProps {
  username: string
  nickname: string
  email: string
  avatar: string | null
}

export function AvatarPopover({
  username,
  nickname,
  email,
  avatar,
}: AvatarPopoverProps) {
  const userNav = [
    { title: "내 블로그", href: `/blog/@${username}`, icon: Icons.clover },
    { title: "글쓰기", href: `/write`, icon: Icons.clipboard },
  ]

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" className="w-10 rounded-full p-0">
          <UserAvatar src={avatar} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="!w-70">
        <div className="grid">
          <div className="space-y-1">
            <UserAvatar src={avatar} avatarClassName="w-14 h-14" />
            <h4 className="font-bold leading-none">{nickname}</h4>
            <p className="text-muted-foreground text-sm">{email}</p>
          </div>
          <Separator className="my-3 opacity-25" />

          <ul className="flex flex-col">
            {userNav.map((nav, index) => (
              <li key={index}>
                <Link
                  href={nav.href}
                  className="flex items-center gap-2 py-2 hover:text-black/90"
                >
                  <nav.icon className="h-5 w-5" />
                  <span>{nav.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </PopoverContent>
    </Popover>
  )
}
