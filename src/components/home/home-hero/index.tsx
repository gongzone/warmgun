import { ArticleShowcase } from "./article-showcase"
import { HeroGradient } from "./hero-gradient"
import { HeroMainWords } from "./hero-main-words"
import { HeroSubWords } from "./hero-sub-words"

const articles = Array.from({ length: 10 }, (_, i) => {
  return {
    id: i + 1,
    title: `테스트용 아티클입니다. 굉장히 재미있는 개발이군요.. - ${i + 1}`,
    excerpt:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum modi pariatur alias. Natus animi in officiis nesciunt laborum reiciendis est voluptatibus nihil sunt! Sit optio inventore laudantium eveniet aperiam non.",
    thumbnail: `https://picsum.photos/id/${(i + 1) * 27}/${270 * 2}/${405 * 2}`,
    user: {
      nickname: `테스트용 계정 ${i + 1}`,
      avatar: "https://i.pravatar.cc/300",
    },
    category: "프론트엔드",
    tags: ["Svelte", "Typescript"],
  }
})

const HomeHero = () => {
  return (
    <div className="grid grid-cols-1 items-center gap-8 md:gap-10 lg:grid-cols-2">
      <div className="relative z-20 mx-auto space-y-4 md:space-y-6 lg:mx-0">
        <HeroMainWords />
        <HeroSubWords />
      </div>

      <div className="relative mx-auto h-full w-full">
        <HeroGradient />
        <ArticleShowcase articles={articles} />
        {/* <HeroGradient />
		{#if articles.length > 0}
			<ArticleShowcase {articles} />
		{:else}
			<NoDataCard />
		{/if} */}
      </div>
    </div>
  )
}

export { HomeHero }
