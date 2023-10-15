import { TextWithIcon } from "@/components/@ui/text-with-icon"

type PublishSheetTitleProps = {
  title: string
}

export const PublishSheetTitle = ({ title }: PublishSheetTitleProps) => {
  return (
    <TextWithIcon
      icon={(Icons) => <Icons.Contrast className="h-4 w-4" />}
      text={(Text) => (
        <Text size="sm" weight={500}>
          {title}
        </Text>
      )}
      className="mb-1"
    />
  )
}
