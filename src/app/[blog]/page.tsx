import { Container } from "@/components/@ui/container"

import { BlogTab } from "./_components/blog-tap"
import { BlogerInfo } from "./_components/bloger-info"

type BlogPageProps = {
  params: { blog: string }
}

export default async function BlogPage({ params }: BlogPageProps) {
  return (
    <Container variant="medium">
      <section className="mb-6 border-x border-b">
        <BlogerInfo blogerUsername={decodeURIComponent(params.blog).slice(1)} />
      </section>

      <section>
        <BlogTab />
      </section>
    </Container>
  )
}
