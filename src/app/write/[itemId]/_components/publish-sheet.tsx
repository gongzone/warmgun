import { Button } from "@/components/@ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/@ui/sheet"

export const PublishSheet = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button radius="full">글 등록</Button>
      </SheetTrigger>
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle>Publish Article</SheetTitle>
          <SheetDescription>
            아티클의 세부사항을 설정하고 출간하기 버튼을 누르세요.
          </SheetDescription>
        </SheetHeader>
        <SheetFooter></SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
