"use client"

import React from "react"
import Link from "next/link"
import { useSelectedLayoutSegment } from "next/navigation"

import { buttonVariants } from "@/components/ui/button"
import { Icons } from "@/components/ui/icons"

export function AuthWrapper({ children }: { children: React.ReactNode }) {
  const segment = useSelectedLayoutSegment()

  return (
    <div className="mx-auto max-w-[438px] space-y-6">
      <div className="space-y-4">
        <div className="flex gap-2">
          <span className="bg-foreground flex h-7 w-7 items-center justify-center rounded-full">
            <Icons.service className="text-background h-5 w-5" />
          </span>
          <span className="font-heading text-3xl">
            {segment === "login" ? "로그인" : "회원가입"}
          </span>
        </div>

        <div>
          <blockquote className="border-secondary border-l-8 pl-4 italic">
            <h2 className="font-heading text-2xl">Warmgun에서</h2>
            <h2 className="font-heading text-2xl">
              당신의 이야기를 들려주세요.
            </h2>
          </blockquote>
        </div>
      </div>

      {children}

      <div className="text-center">
        <span>
          {segment === "login"
            ? "계정이 없으신가요? "
            : "이미 계정이 있으신가요? "}
        </span>
        <Link
          href={segment === "login" ? "/auth/signup" : "/auth/login"}
          className={buttonVariants({ variant: "link" })}
        >
          {segment === "login" ? "회원가입" : "로그인"}
        </Link>
      </div>
    </div>
  )
}
