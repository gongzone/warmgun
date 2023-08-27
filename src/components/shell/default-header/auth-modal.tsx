import { Button } from "@/components/@ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/@ui/dialog"
import { Icons } from "@/components/@ui/icons"

interface AuthModalProps {
  triggerButton: React.ReactNode
}

const socials = [
  { name: "구글", icon: <Icons.Google className="h-5 w-5" /> },
  { name: "깃허브", icon: <Icons.Github className="h-5 w-5" /> },
  { name: "트위터(X)", icon: <Icons.Twitter className="h-5 w-5" /> },
]

const AuthModal = ({ triggerButton }: AuthModalProps) => {
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
              <Button fullWidth>
                {social.icon} {social.name} 로그인
              </Button>
            </li>
          ))}
        </ul>
      </DialogContent>
    </Dialog>
  )
}

export { AuthModal }
