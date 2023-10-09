import { Button } from "@/components/@ui/button"
import { Carousel } from "@/components/@ui/carousel"
import { Container } from "@/components/@ui/container"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/@ui/tabs"
import { Text } from "@/components/@ui/text"
import { AppShell } from "@/components/app-shell"
import { ArticleItem } from "@/components/article/article-item"
import { BigArticleItem } from "@/components/article/big-article-item"
import { HomeHero } from "@/components/home/home-hero"
import { BloggerItem } from "@/components/user/blogger-item"

const articles = Array.from({ length: 12 }, (_, i) => {
  return {
    id: i + 1,
    title: `테스트용 아티클입니다. 굉장히 재미있는 개발이군요.. - ${i + 1}`,
    excerpt:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum modi pariatur alias. Natus animi in officiis nesciunt laborum reiciendis est voluptatibus nihil sunt! Sit optio inventore laudantium eveniet aperiam non. imi in officiis nesciunt laborum reiciendis est voluptatibus nihil sunt! Sit optio inventore laudantium eveniet aperiam non imi in officiis nesciunt laborum reiciendis est voluptatibus nihil sunt! Sit optio inventore laudantium eveniet aperiam non",
    thumbnail: `https://picsum.photos/id/${(i + 1) * 27}/${1200}/${800}`,
    user: {
      username: `테스트용 계정 ${i + 1}`,
      avatar: "https://i.pravatar.cc/300",
    },
    tags: ["Svelte", "Typescript"],
    createdAt: new Date(),
  }
})

const tags = [
  "JavaScript",
  "TypeScript",
  "Redux",
  "FrontEnd",
  "일상",
  "테스트 코드",
  "이것저것",
  "백엔드",
  "머신러닝",
  "AI",
  "Next.js",
  "AOP",
]

const users = Array.from({ length: 10 }, (_, i) => {
  return {
    username: `RailyBreathe ${i + 1}`,
    avatar: "https://i.pravatar.cc/300",
  }
})

export default async function Home() {
  return (
    <AppShell className="">
      <section className="border-b py-12">
        <Container variant="wide" center={true}>
          <HomeHero />
        </Container>
      </section>

      <section className="py-12">
        <Container variant="wide" center={true}>
          <div className="flex flex-col ">
            <Text size="3xl" weight={500}>
              트렌딩 아티클
            </Text>
            <Text size="md" weight={300}>
              요즘 뜨는 글들을 만나보세요
            </Text>
          </div>
          <ul className="my-8 grid grid-cols-4 gap-9">
            {articles.map((article) => (
              <li key={article.id}>
                <ArticleItem article={article} />
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="pb-12">
        <Container variant="wide" center={true}>
          <div className="flex flex-col">
            <Text size="3xl" weight={500}>
              베스트 블로거
            </Text>
            <Text size="md" weight={300}>
              멋진 이들을 만나보세요
            </Text>
          </div>

          <ul className="mt-4 flex gap-7">
            {users.map((user) => (
              <li key={user.username}>
                <BloggerItem avatar={user.avatar} username={user.username} />
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="pb-12">
        <Container variant="wide" center={true}>
          <div className="flex flex-col">
            <Text size="3xl" weight={500}>
              인기 태그
            </Text>
            <Text size="md" weight={300}>
              다양한 주제의 글들을 만나보세요
            </Text>
          </div>

          <div className="mt-4">
            <ul className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <li key={tag}>
                  <Button size="sm" radius="full">
                    {tag}
                  </Button>
                </li>
              ))}
            </ul>
            <div className="relative h-[450px]">
              <Carousel slides={[1, 2, 3, 4, 5, 6, 7, 8]} />
            </div>
          </div>
        </Container>
      </section>

      <section className="py-12">
        <Container variant="wide" center={true}>
          <div className="flex flex-col">
            <Text size="3xl" weight={500}>
              최신 아티클
            </Text>
            <Text size="md" weight={300}>
              최신 소식을 들어보세요
            </Text>
          </div>

          <div className="">
            <div className="relative h-[450px]">
              <Carousel slides={[1, 2, 3, 4, 5, 6, 7, 8]} />
            </div>
          </div>
        </Container>
      </section>
    </AppShell>
  )
}
