import { type TagDetail } from "@/lib/services/tag/types"
import { Button } from "@/components/@ui/button"
import { Text } from "@/components/@ui/text"
import { TextWithIcon } from "@/components/@ui/text-with-icon"

type TagTopAreaProps = {
  tag: TagDetail
}

export const TagTopArea = ({ tag }: TagTopAreaProps) => {
  return (
    <div>
      <div className="flex flex-col items-center justify-center gap-3.5">
        <Text size="4xl" weight={700}>
          # {tag.name}
        </Text>
        <div className="flex items-center gap-1.5">
          <TextWithIcon
            icon={(Icons) => <Icons.Following className="h-4 w-4" />}
            text={(Text) => (
              <Text size="sm">{tag._count.followedBy} 팔로워</Text>
            )}
          />
          <span>·</span>
          <TextWithIcon
            icon={(Icons) => <Icons.DocumentList className="h-4 w-4" />}
            text={(Text) => <Text size="sm">{tag._count.articles} 아티클</Text>}
          />
        </div>
        <Button radius="full" size="sm">
          구독하기
        </Button>
      </div>
    </div>
  )
}
