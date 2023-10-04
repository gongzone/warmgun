import { fetchOneDraft } from "@/lib/services/draft/fetch"
import { Container } from "@/components/@ui/container"
import { AppShell } from "@/components/app-shell"
import { Editor } from "@/components/editor/editor"
import { TitleTextarea } from "@/components/editor/title-textarea"

import { WriteHeader } from "../_components/write-header"
import { WriteProvider } from "../_lib/store"

type CreateDraftPageProps = {
  params: { itemId: string }
}

export default async function CreateDraftPage({
  params,
}: CreateDraftPageProps) {
  const pageDraftId = Number(params.itemId)
  const draft = await fetchOneDraft(pageDraftId)

  return (
    <WriteProvider>
      <AppShell header={<WriteHeader mode="create" />}>
        <Container variant="prose" className="my-10 space-y-4">
          <TitleTextarea title={draft.title} />
          <Editor body={draft.body} />
        </Container>
      </AppShell>
    </WriteProvider>
  )
}
