"use client"

import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { FormInput } from "@/components/ui-blocks/FormInput"

export default function LoginPage() {
  const { toast } = useToast()

  return (
    <form>
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
