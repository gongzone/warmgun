import Link from "next/link"

import { logoutAction } from "@/lib/services/auth/action"
import { Avatar } from "@/components/@ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/@ui/dropdown-menu"
import { Icons } from "@/components/@ui/icons"
import { SubmitButton } from "@/components/@ui/submit-button"
import { Text } from "@/components/@ui/text"
import { TextWithIcon } from "@/components/@ui/text-with-icon"

interface UserMenuProps {
  name: string
  image: string | null | undefined
}

export const UserMenu = ({ name, image }: UserMenuProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="cursor-pointer" asChild>
        <Avatar src={image} border />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>{name}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href={`/@${name}`}>
              <Icons.HomeIcon className="mr-2 h-4 w-4" />
              <Text>내 블로그</Text>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/write">
              <Icons.PencilIcon className="mr-2 h-4 w-4" />
              <Text>글쓰기</Text>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Icons.BookmarkIcon className="mr-2 h-4 w-4" />
            <Text>나의 피드</Text>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Icons.SettingIcon className="mr-2 h-4 w-4" />
            <Text>설정</Text>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <form action={logoutAction}>
            <DropdownMenuItem asChild>
              <SubmitButton
                uiButton={false}
                className="h-full w-full"
                type="submit"
              >
                <TextWithIcon
                  icon={<Icons.LogoutIcon className="h-4 w-4" />}
                  text={<Text>로그아웃</Text>}
                />
              </SubmitButton>
            </DropdownMenuItem>
          </form>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
