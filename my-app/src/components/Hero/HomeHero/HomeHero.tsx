import { Button } from "@/components/ui/button"
import { Carousel } from "@/components/ui/carousel"
import { Icons } from "@/components/ui/icons"

import { TopBlogerCard } from "./TopBlogerCard/TopBlogerCard"

export function HomeHero() {
  return (
    <div className="grid grid-cols-1 items-center gap-8 md:gap-10 lg:grid-cols-2">
      <div className="space-y-6">
        <HeroIcon />
        <HeroWords />
        <HeroSubWords />
      </div>

      <div className="relative h-full max-w-[620px]">
        <HeroGradient />
        <TopBlogerBadge />
        <Carousel>
          {Array.from({ length: 10 }).map((_, index) => (
            <TopBlogerCard
              key={index}
              username={`익명의 블로거-${index + 1}`}
              avatar={null}
              field="블로거"
              bio="반갑습니다. Modrich입니다."
              followedByCount={21}
              followingCount={35}
              articleCount={102}
            />
          ))}
        </Carousel>
      </div>
    </div>
  )
}

function HeroIcon() {
  return (
    <div className="bg-primary flex h-24 w-24 items-center justify-center rounded-full">
      <div className="bg-muted flex h-16 w-16 items-center justify-center rounded-full">
        <Icons.crosshair className="h-8 w-8" />
      </div>
    </div>
  )
}

function HeroWords() {
  return (
    <div>
      <h2 className="font-heading text-4xl font-bold min-[540px]:text-6xl">
        당신의 개발 이야기
      </h2>
      <h3 className="font-heading text-2xl font-bold min-[540px]:text-4xl">
        기록하고 공유하세요
      </h3>
    </div>
  )
}

function HeroSubWords() {
  return (
    <div>
      <p className="text-lg font-thin">Bring, Discover, Share</p>
      <p className="text-lg font-thin">Ideas & Stories</p>
    </div>
  )
}

function HeroGradient() {
  return (
    <div
      className="absolute left-[-20px] top-[-46px] -z-10 h-[400px] w-[380px] blur-[45px]"
      style={{
        background: `conic-gradient(
          from 180deg at 67% 67%,
          rgb(226 223 123 / 0.16) 0deg,
          rgb(161 157 50 / 0.25) 55deg,
          rgb(173 164 162 / 0.35) 120deg,
          rgb(158 95 97 / 0.26) 160deg,
          transparent 360deg
)`,
      }}
    ></div>
  )
}

// width: 360px;
// height: 400px;
// z-index: -1;
// top: -43px;
// left: 0;
// position: absolute;
// filter: blur(45px);
// transform: translateZ(0);
// transform: translateY(0%);
// background: conic-gradient(
// 	from 180deg at 67% 67%,
// 	rgb(var(--color-primary-400) / 0.16) 0deg,
// 	rgb(var(--color-primary-700) / 0.25) 55deg,
// 	rgb(var(--color-tertiary-600) / 0.35) 120deg,
// 	rgb(var(--color-error-700) / 0.26) 160deg,
// 	transparent 360deg
// );

function TopBlogerBadge() {
  return (
    <span className="bg-primary text-primary-foreground absolute -right-12 -top-4 z-10 rotate-[30deg] rounded-2xl p-6 text-lg font-extralight">
      Top Bloger
    </span>
  )
}
