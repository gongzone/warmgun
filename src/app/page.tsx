import { getServerSession } from "next-auth"

import { authOptions } from "@/lib/auth"
import { Container } from "@/components/@ui/container"
import { HomeHero } from "@/components/home/home-hero"

export default async function Home() {
  const session = await getServerSession(authOptions)

  return (
    <main className="py-16">
      <section>
        <Container variant="wide" center={true}>
          <HomeHero />
        </Container>
      </section>
    </main>
  )
}
