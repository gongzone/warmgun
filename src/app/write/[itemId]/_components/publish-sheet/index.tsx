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

import { CreateArticleForm } from "./create-article-form"
import { PublishSheetTitle } from "./publish-sheet-title"
import { TagSelector } from "./tag-selector"
import { ThumbnailPreview } from "./thumbnail-preview"

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
        <ul className="my-6 space-y-6">
          <li>
            <PublishSheetTitle title="아티클 썸네일" />
            <ThumbnailPreview />
          </li>
          <li>
            <PublishSheetTitle title="태그 설정" />
            <TagSelector />
          </li>
        </ul>
        <SheetFooter>
          <CreateArticleForm />
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
