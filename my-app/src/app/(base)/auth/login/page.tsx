"use client"

import { redirect } from "next/navigation"

import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { FormInput } from "@/components/ui-blocks/FormInput"

import { login } from "./_action"

export default function LoginPage() {
  const { toast } = useToast()

  async function loginAction(formData: FormData) {
    try {
      await login(formData)
    } catch (err) {
      return toast({
        title: "로그인 과정에서 문제가 발생하였습니다.",
        description: err.message,
      })
    }

    redirect("/")
  }

  return (
    <form action={loginAction}>
      <div className="mb-8 flex flex-col gap-4">
        <FormInput
          type="text"
          name="username"
          labelText="아이디"
          placeholder="아이디를 입력하세요."
        />
        <FormInput
          type="password"
          name="password"
          labelText="비밀번호"
          placeholder="비밀번호를 입력하세요."
        />
      </div>

      <Button type="submit" className="w-full">
        로그인
      </Button>
    </form>
  )
}
