import Image from "next/image"

import { Button } from "@/components/@ui/Button"

export default function Home() {
  return (
    <main className="flex justify-center gap-2">
      <Button variant="default">Button</Button>
      <Button variant="primary">Button</Button>
      <Button variant="primary-invert">Button</Button>
      <Button variant="base">Button</Button>
      <Button variant="base-invert">Button</Button>
      <Button variant="destructive">Button</Button>
      <Button variant="destructive-invert">Button</Button>
      <Button variant="ghost">Button</Button>
      <Button variant="link">Button</Button>
    </main>
  )
}
