import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/@ui/dialog"
import { Icons } from "@/components/@ui/icons"

import { OauthLoginButton } from "./oauth-login-button"

interface AuthModalProps {
  triggerButton: React.ReactNode
}

const socials = [
  {
    provider: "google",
    name: "구글",
    icon: <Icons.Google className="h-5 w-5" />,
  },
  {
    provider: "github",
    name: "깃허브",
    icon: <Icons.Github className="h-5 w-5" />,
  },
]

export const AuthModal = ({ triggerButton }: AuthModalProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{triggerButton}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Warmgun</DialogTitle>
          <DialogDescription>
            Bring, Discover, Share Ideas & Stories
          </DialogDescription>
        </DialogHeader>
        <ul className="grid gap-4 py-4">
          {socials.map((social) => (
            <li key={social.name}>
              <OauthLoginButton
                provider={social.provider}
                name={social.name}
                icon={social.icon}
              />
            </li>
          ))}
        </ul>
      </DialogContent>
    </Dialog>
  )
}
