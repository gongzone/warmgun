import { AppShell } from "@/components/AppShell"

import { WriteHeader } from "../_components/WriteHeader"

export default function CreateDraftPage() {
  return (
    <AppShell header={<WriteHeader mode="create" />}>hello! create!</AppShell>
  )
}
