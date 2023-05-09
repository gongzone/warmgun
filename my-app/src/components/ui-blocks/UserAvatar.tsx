import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Icons } from "@/components/ui/icons"

interface UserAvatarProps {
  src: string | null
  alt?: string
  avatarClassName?: string
  imageClassName?: string
  fallbackClassName?: string
}

export function UserAvatar({
  src,
  alt,
  avatarClassName,
  imageClassName,
  fallbackClassName,
}: UserAvatarProps) {
  return (
    <Avatar className={cn(avatarClassName)}>
      <AvatarImage
        className={cn(imageClassName)}
        src={src ? src : undefined}
        alt={alt ? alt : "user-avatar"}
      />
      <AvatarFallback className={cn("text-foreground", fallbackClassName)}>
        <Icons.user className="h-[52%] w-[52%]" />
      </AvatarFallback>
    </Avatar>
  )
}
