import { fetchOneDraft } from "@/lib/services/draft/fetch"
import { Container } from "@/components/@ui/container"
import { AppShell } from "@/components/app-shell"

import { WriteEditor } from "../_components/write-editor"
import { WriteHeader } from "../_components/write-header"

type CreateDraftPageProps = {
  params: { itemId: string }
}

export default async function CreateDraftPage({
  params,
}: CreateDraftPageProps) {
  const pageDraftId = Number(params.itemId)
  const draft = await fetchOneDraft(pageDraftId)

  return (
    <AppShell header={<WriteHeader mode="create" />}>
      <Container variant="prose" className="my-10">
        <WriteEditor title={draft.title} body={draft.body} />
      </Container>
    </AppShell>
  )
}
