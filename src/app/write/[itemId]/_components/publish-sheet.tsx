import { Button } from "@/components/@ui/button"
import { Icons } from "@/components/@ui/icons"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/@ui/sheet"
import { Text } from "@/components/@ui/text"
import { TextWithIcon } from "@/components/@ui/text-with-icon"

import { PublishArticleForm } from "./publish-article-form"
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
          <li className="space-y-1">
            <TextWithIcon
              icon={<Icons.Contrast className="h-4 w-4" />}
              text={
                <Text size="sm" weight={500}>
                  아티클 썸네일
                </Text>
              }
            />
            <ThumbnailPreview />
          </li>
          <li className="space-y-1">
            <TextWithIcon
              icon={<Icons.Contrast className="h-4 w-4" />}
              text={
                <Text size="sm" weight={500}>
                  태그 설정
                </Text>
              }
            />
            <TagSelector />
          </li>
        </ul>
        <SheetFooter>
          <PublishArticleForm />
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
