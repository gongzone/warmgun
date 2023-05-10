import Image from "next/image"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Icons } from "@/components/ui/icons"
import { Separator } from "@/components/ui/seperator"
import { UserAvatar } from "@/components/ui-blocks/UserAvatar"

export function BlogHero() {
  return (
    <div className="">
      <div className="min-h-[400px] w-full">
        <div className="container grid grid-cols-1 gap-9 py-12 lg:grid-cols-2">
          <div className="max-w-[650px]">
            <div className="space-y-2">
              <div className="flex gap-6">
                <UserAvatar
                  src="https://picsum.photos/id/42/280/280"
                  avatarClassName="w-[168px] h-[168px]"
                />
              </div>
              <h3 className="text-primary items-end text-5xl font-bold">
                Gongzone
              </h3>
              <div className="flex flex-col gap-1">
                <span className="text-2xl font-extralight">Frontend</span>
                <p className="line-clamp-4 break-all text-base font-thin">
                  다양한 개발 방법론을 공부하고 있습니다.
                </p>
                <span className="text-base font-thin"></span>
              </div>
            </div>

            <div className="mt-4 flex items-center gap-6">
              <div className="relative inline-flex flex-col rounded-md border p-4">
                <span className="bg-muted absolute -left-3 -top-3 rounded-full p-2">
                  <Icons.hearts className="h-4 w-4" />
                </span>
                <span className="font-extralight md:text-lg">구독자</span>
                <span className="text-sm">250</span>
              </div>
              <div className="relative inline-flex flex-col rounded-md border p-4">
                <span className="bg-muted absolute -left-3 -top-3 rounded-full p-2">
                  <Icons.following className="h-4 w-4" />
                </span>
                <span className="font-extralight md:text-lg">팔로잉</span>
                <span className="text-sm">16</span>
              </div>
              <div className="relative inline-flex flex-col rounded-md border p-4">
                <span className="bg-muted absolute -left-3 -top-3 rounded-full p-2">
                  <Icons.book className="h-4 w-4" />
                </span>
                <span className="font-extralight md:text-lg">아티클</span>
                <span className="text-sm">36</span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="absolute left-0 top-0 -z-50 w-screen brightness-[0.17] lg:static lg:w-full lg:brightness-100">
              <div className="h-[420px] overflow-hidden rounded-2xl shadow-xl">
                <Image
                  src="https://picsum.photos/id/2/1240/800"
                  alt="some"
                  fill={false}
                  width={1240}
                  height={800}
                  className="h-full w-full rounded-xl object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="relative flex gap-4 ">
          <div className="bg-primary absolute right-0 top-[50%] h-4 w-4 -translate-y-1/2 rounded-full"></div>
          <div className="border-b-foreground absolute top-0 -z-50 h-[50%] w-full border-b"></div>
          <a
            href="/"
            className={cn(
              buttonVariants({ variant: "outline" }),
              "bg-background h-10 w-10 p-0"
            )}
          >
            <Icons.gitHub className="h-6 w-6" />
          </a>

          <a
            href="/"
            className={cn(
              buttonVariants({ variant: "outline" }),
              "bg-background h-10 w-10 p-0"
            )}
          >
            <Icons.twitter className="h-6 w-6" />
          </a>

          <a
            href="/"
            className={cn(
              buttonVariants({ variant: "outline" }),
              "bg-background h-10 w-10 p-0"
            )}
          >
            <Icons.logo className="h-6 w-6" />
          </a>
        </div>
      </div>
    </div>
  )
}
