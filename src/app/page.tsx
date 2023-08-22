import { Button } from "@/components/@ui/button"

export default function Home() {
  return (
    <main>
      <div className="flex flex-wrap items-center gap-4 p-20">
        <Button>로그인</Button>
        <Button variant="base">로그인</Button>
        <Button variant="base-invert">로그인</Button>
        <Button variant="base-ghost">로그인</Button>
        <Button variant="primary">로그인</Button>
        <Button variant="primary-invert">로그인</Button>
        <Button variant="primary-ghost">로그인</Button>
        <Button variant="success">로그인</Button>
        <Button variant="success-invert">로그인</Button>
        <Button variant="success-ghost">로그인</Button>
        <Button variant="warning">로그인</Button>
        <Button variant="warning-invert">로그인</Button>
        <Button variant="warning-ghost">로그인</Button>
        <Button variant="danger">로그인</Button>
        <Button variant="danger-invert">로그인</Button>
        <Button variant="danger-ghost">로그인</Button>
      </div>
    </main>
  )
}
