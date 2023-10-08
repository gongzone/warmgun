import { fetchOneDraft } from "@/lib/services/draft/fetch"
import { Container } from "@/components/@ui/container"
import { AppShell } from "@/components/app-shell"

import { WriteEditor } from "../_components/write-editor"
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
    <WriteProvider title={draft.title} body={draft.body}>
      <AppShell header={<WriteHeader mode="create" />}>
        <Container variant="prose" className="my-10">
          <WriteEditor />
        </Container>
      </AppShell>
    </WriteProvider>
  )
}
