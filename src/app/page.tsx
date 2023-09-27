import { Container } from "@/components/@ui/container"
import { AppShell } from "@/components/AppShell"
import { HomeHero } from "@/components/home/home-hero"

export default async function Home() {
  return (
    <AppShell className="py-16">
      <section>
        <Container variant="wide" center={true}>
          <HomeHero />
        </Container>
      </section>
    </AppShell>
  )
}
