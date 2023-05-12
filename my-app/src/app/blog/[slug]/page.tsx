import Link from "next/link"

import { Separator } from "@/components/ui/seperator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArticleItem } from "@/components/Article/ArticleItem/ArticleItem"
import { BlogHero } from "@/components/Hero/BlogHero/BlogHero"

export default function BlogPage() {
  return (
    <div>
      <BlogHero />

      <div className="container mt-24 space-y-12">
        <div className="flex items-center">
          <Link
            href="/"
            className="bg-secondary text-secondary-foreground rounded-lg p-4 text-xl font-bold"
          >
            Home
          </Link>
          <Link href="/" className="p-4 text-xl font-bold">
            장편
          </Link>
        </div>

        <ul className="grid list-none grid-cols-1 gap-9 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 9 }).map((_, index) => (
            <li key={index}>
              <ArticleItem
                title={`타입스크립트에 대해 알아봅시다. 이것은 정말 중요합니다. - ${
                  index + 1
                }`}
                subTitle="Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit delectus voluptates sunt molestias aspernatur eveniet, pariatur quasi possimus hic aliquam ipsa nulla dicta eaque corrupti labore cumque qui, ipsam asperiores!"
                slug="/"
                coverImage={`https://picsum.photos/id/${
                  (index + 8) * 5
                }/600/450`}
                user={null}
                likeCount={245}
                commentCount={85}
                createdAt={new Date()}
                tags={[
                  "Serverside-Rendering",
                  "React",
                  "JavaScript",
                  "개발자",
                  "나의 이야기",
                ]}
              />
            </li>
          ))}
        </ul>
      </div>

      <div className="h-40"></div>
    </div>
  )
}
