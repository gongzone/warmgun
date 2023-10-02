import { fetchOneDraft } from "@/lib/services/draft/fetch"
import { Container } from "@/components/@ui/container"
import { AppShell } from "@/components/app-shell"
import { Editor, EditorProvider } from "@/components/editor"

import { TitleTextarea } from "../_components/title-textarea"
import { WriteHeader } from "../_components/write-header"

type CreateDraftPageProps = {
  params: { itemId: string }
}

export default async function CreateDraftPage({
  params,
}: CreateDraftPageProps) {
  const draftId = Number(params.itemId)
  const draft = await fetchOneDraft(draftId)

  return (
    <EditorProvider body={draft.body}>
      <AppShell header={<WriteHeader mode="create" />}>
        <Container variant="prose" className="my-10 space-y-4">
          <TitleTextarea title={draft.title} />
          <Editor />
        </Container>
      </AppShell>
    </EditorProvider>
  )
}
