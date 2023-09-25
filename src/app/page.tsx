import { Avatar } from "@/components/@ui/avatar"
import { Badge } from "@/components/@ui/badge"
import { Button } from "@/components/@ui/button"
import { Card, CardBody } from "@/components/@ui/card"
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
