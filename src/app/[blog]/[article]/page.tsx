import { fetchOneArticle } from "@/lib/services/article/fetch"
import { Container } from "@/components/@ui/container"
import { AppShell } from "@/components/app-shell"
import { Editor } from "@/components/editor/editor"

import { ArticleDetailHeader } from "./_components/article-detail-header"
import { ArticleEnd } from "./_components/article-end"
import { ArticleInfo } from "./_components/article-info"
import { CommentArea } from "./_components/comment-area"
import { UserInfo } from "./_components/user-info"

type ArticleDetailPageProps = {
  params: { blog: string; article: string }
}

export default async function ArticleDetailPage({
  params,
}: ArticleDetailPageProps) {
  const article = await fetchOneArticle(decodeURI(params.article))

  if (!article) {
    return // TODO: 404PAGE
  }

  return (
    <AppShell
      header={
        <ArticleDetailHeader
          blogName={article.user.profile?.blogName}
          blogUsername={article.user.username}
        />
      }
    >
      <Container variant="wide" className="py-12">
        <div className="mx-auto max-w-prose">
          <section>
            <ArticleInfo article={article} />
          </section>

          <section className="py-12">
            <Editor body={article.body} editable={false} />
          </section>

          <section className="py-12">
            <ArticleEnd article={article} />
          </section>

          <section className="pb-24">
            <UserInfo user={article.user} />
          </section>

          <section>
            <CommentArea />
          </section>
        </div>
      </Container>
    </AppShell>
  )
}
