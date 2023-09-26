import { Container } from "@/components/@ui/container"
import { HomeHero } from "@/components/home/home-hero"

export default function Home() {
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
