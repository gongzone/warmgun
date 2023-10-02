import { getServerSession } from "@/lib/auth"
import { createDraftAction } from "@/lib/services/draft/action"
import { Button } from "@/components/@ui/button"
import { Icons } from "@/components/@ui/icons"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/@ui/sheet"

export const DraftSheet = async () => {
  const session = await getServerSession()

  if (!session?.user) {
    return // TODO: 유저 못찾음 컴포넌트 렌더링
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button onlyIcon>
          <Icons.DocumentList className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{session.user.username}님의 글쓰기</SheetTitle>
          <SheetDescription>
            쓰고있는 글들을 임시 저장하고 관리하세요.
          </SheetDescription>
        </SheetHeader>
        {/* <DraftAccorion userId={session.user.userId} /> */}
        <SheetFooter className="mt-8">
          {/* <CreateDraftForm /> */}
          <form></form>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}