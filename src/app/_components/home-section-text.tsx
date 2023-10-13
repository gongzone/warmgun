import { Text } from "@/components/@ui/text"

type HomeSectionTextProps = {
  title: string
  description?: string
}

export const HomeSectionText = ({
  title,
  description,
}: HomeSectionTextProps) => {
  return (
    <div className="mb-8 flex flex-col items-center">
      <Text family="heading" size="4xl" weight={600}>
        {title}
      </Text>
      {description ? (
        <Text size="md" weight={300}>
          {description}
        </Text>
      ) : null}
    </div>
  )
}
