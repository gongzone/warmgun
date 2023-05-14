"use client"

import { revalidateTag } from "next/cache"
import { redirect } from "next/navigation"

import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { FormInput } from "@/components/ui-blocks/FormInput"

export default function Signupage() {
  const { toast } = useToast()

  return (
    <form>
      <div className="mb-8 flex flex-col gap-4">
        <FormInput
          type="text"
          name="username"
          labelText="아이디"
          helperText="* 5~20자 사이의 영문 소문자/숫자 입력"
          placeholder="아이디를 입력하세요."
        />
        <FormInput
          type="password"
          name="password"
          labelText="비밀번호"
          helperText="* 8~20자 사이, 영문/숫자/특수 문자 중 2가지 이상 포함"
          placeholder="비밀번호를 입력하세요."
        />
        <FormInput
          type="password"
          name="confirm"
          labelText="비밀번호 확인"
          placeholder="앞선 비밀번호와 동일하게 작성하세요."
        />
        <FormInput
          type="email"
          name="email"
          labelText="이메일"
          placeholder="이메일을 입력하세요."
        />
      </div>

      <Button type="submit" className="w-full">
        회원가입
      </Button>
    </form>
  )
}
