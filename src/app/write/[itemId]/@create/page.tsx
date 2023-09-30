import { Container } from "@/components/@ui/container"
import { AppShell } from "@/components/app-shell"

import { WriteEditor } from "../_components/write-editor"
import { WriteHeader } from "../_components/write-header"

export default function CreateDraftPage() {
  return (
    <AppShell header={<WriteHeader mode="create" />}>
      <Container variant="prose" center className="my-10">
        <WriteEditor />
      </Container>
    </AppShell>
  )
}
