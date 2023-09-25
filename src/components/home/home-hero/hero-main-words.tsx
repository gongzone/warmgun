import { Text } from "@/components/@ui/text"

const HeroMainWords = () => {
  return (
    <div>
      <Text
        as="h2"
        family="heading"
        size={{
          initial: "4xl",
          sm: "6xl",
        }}
      >
        당신의 개발 이야기
      </Text>
      <Text
        as="h2"
        family="heading"
        size={{
          initial: "2xl",
          sm: "4xl",
        }}
      >
        기록하고 공유하세요
      </Text>
    </div>
  )
}

export { HeroMainWords }
