import { Container } from "@/components/@ui/container"
import { AppShell } from "@/components/app-shell"

import { HomeHero } from "./_components/home-hero"
import { HomeSectionText } from "./_components/home-section-text"
import { TrendingArticles } from "./_components/trending-articles"

export default async function Home() {
  return (
    <AppShell>
      <section className="border-b bg-background-naive py-20">
        <Container variant="wide" center={true}>
          <HomeHero />
        </Container>
      </section>

      <section className="border-b py-20">
        <Container variant="wide" center={true}>
          <HomeSectionText
            title="트렌딩 아티클"
            description="요즘 시대를 살아가는 어떤 이들의 이야기"
          />
          <TrendingArticles />
        </Container>
      </section>

      <section className="py-20">
        <Container variant="wide" center={true}>
          <HomeSectionText
            title="베스트 블로거"
            description="참 멋지고 다정한 친구들이군요!"
          />

          {/* <ul className="flex gap-7">
            {users.map((user) => (
              <li key={user.username}>
                <BloggerItem avatar={user.avatar} username={user.username} />
              </li>
            ))}
          </ul> */}
        </Container>
      </section>

      {/* <section className="border-b py-20">
        <Container variant="wide" center={true}>
          <div className="mb-8 flex flex-col">
            <Text
              family="heading"
              size="4xl"
              weight={600}
              className="text-center"
            >
              인기 태그
            </Text>
            <Text size="md" weight={300} className="text-center">
              다양한 주제의 글들을 만나보세요
            </Text>
          </div>

          <div className="">
            <ul className="flex flex-wrap justify-center gap-2">
              {tags.map((tag) => (
                <li key={tag}>
                  <Button size="sm" radius="full">
                    {tag}
                  </Button>
                </li>
              ))}
            </ul>
            <div className="relative h-[450px]"></div>
          </div>
        </Container>

        <section className="pt-20">
          <Container variant="wide" center={true}>
            <div className="flex flex-col">
              <Text
                family="heading"
                size="4xl"
                weight={600}
                className="text-center"
              >
                최신 아티클
              </Text>
              <Text size="md" weight={300} className="text-center">
                최신 소식을 들어보세요
              </Text>
            </div>

            <div className="">
              <div className="relative h-[450px]"></div>
            </div>
          </Container>
        </section>
      </section> */}
    </AppShell>
  )
}

// const articles = Array.from({ length: 12 }, (_, i) => {
//   return {
//     id: i + 1,
//     title: `테스트용 아티클입니다. 굉장히 재미있는 개발이군요.. - ${i + 1}`,
//     excerpt:
//       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum modi pariatur alias. Natus animi in officiis nesciunt laborum reiciendis est voluptatibus nihil sunt! Sit optio inventore laudantium eveniet aperiam non. imi in officiis nesciunt laborum reiciendis est voluptatibus nihil sunt! Sit optio inventore laudantium eveniet aperiam non imi in officiis nesciunt laborum reiciendis est voluptatibus nihil sunt! Sit optio inventore laudantium eveniet aperiam non",
//     thumbnail: `https://picsum.photos/id/${(i + 1) * 27}/${1200}/${800}`,
//     user: {
//       username: `테스트용 계정 ${i + 1}`,
//       avatar: "https://i.pravatar.cc/300",
//     },
//     tags: ["Svelte", "Typescript"],
//     createdAt: new Date(),
//   }
// })

// const tags = [
//   "JavaScript",
//   "TypeScript",
//   "Redux",
//   "FrontEnd",
//   "일상",
//   "테스트 코드",
//   "이것저것",
//   "백엔드",
//   "머신러닝",
//   "AI",
//   "Next.js",
//   "AOP",
// ]

// const users = Array.from({ length: 10 }, (_, i) => {
//   return {
//     username: `RailyBreathe ${i + 1}`,
//     avatar: "https://i.pravatar.cc/300",
//   }
// })
