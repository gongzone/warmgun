import Image from "next/image"
import Link from "next/link"

import { siteConfig } from "@/config/site"
import heroImageOne from "@/lib/images/hero-img-one.svg"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Icons } from "@/components/ui/icons"
import { Separator } from "@/components/ui/seperator"
import { ArticleItem } from "@/components/Article/ArticleItem/ArticleItem"
import { HomeHero } from "@/components/Hero/HomeHero/HomeHero"

export default function IndexPage() {
  return (
    <>
      <section className="container py-16 md:py-20">
        <HomeHero />
      </section>

      <section className="container space-y-12 py-16 md:py-20">
        <div>
          <h3 className="font-heading text-4xl sm:text-5xl">
            Trending Articles
          </h3>
          <div className="flex items-center gap-1">
            <Icons.fire className="text-muted-foreground h-5 w-5" />
            <p className="text-muted-foreground text-lg font-thin">
              요즘 뜨는 아티클들을 만나보세요
            </p>
          </div>
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
                  (index + 1) * 5
                }/600/450`}
                user={{
                  username: "커트니 러브",
                  avatar: "https://picsum.photos/id/237/128/128",
                  field: "Frontend",
                }}
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
      </section>

      <section className="container space-y-4 py-16 md:py-20">
        <div>
          <h3 className="font-heading text-4xl sm:text-5xl">
            더 많은 글들이 당신을 기다립니다
          </h3>
          <div className="flex items-center gap-1">
            <Icons.carrot className="text-muted-foreground h-5 w-5" />
            <p className="text-muted-foreground text-lg font-thin">
              지식과 영감을 얻고 유용하게 활용하세요
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          <Image src={heroImageOne} alt="hero-img-one" />
          <div className="space-y-8">
            <div>
              <div className="flex items-center gap-2">
                <Icons.boxes className="h-10 w-10" />
                <h3 className="font-heading text-3xl">Genre</h3>
              </div>
              <Separator className="my-4" />
              <ul className="flex flex-wrap gap-4">
                {siteConfig.genre.map((genre, index) => (
                  <li key={index} className="">
                    <Link
                      href={genre.href}
                      className={cn(
                        buttonVariants({ variant: "outline" }),
                        "hover:bg-foreground hover:text-background"
                      )}
                    >
                      {genre.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="inline-flex flex-col gap-4 sm:flex-row sm:items-center">
              <Link
                href="/articles"
                className={buttonVariants({ variant: "default" })}
              >
                <Icons.ArrowRight className="mr-2" />
                <span className="text-lg">아티클 페이지</span>
              </Link>

              <Link
                href="/tags"
                className={buttonVariants({ variant: "secondary" })}
              >
                <Icons.ArrowRight className="mr-2" />
                <span className="text-lg">태그 페이지</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
