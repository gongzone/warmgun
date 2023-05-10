import { WriteHeader } from "@/components/Header/WriteHeader/WriteHeader"

export default function WriteLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <WriteHeader />
      <main className="mx-auto max-w-[700px] p-2 md:my-4">{children}</main>
    </>
  )
}
