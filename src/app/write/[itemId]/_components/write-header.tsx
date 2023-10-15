import Link from "next/link"

import { buttonVariants } from "@/components/@ui/button"
import { Icons } from "@/components/@ui/icons"

import { DraftSheet } from "./draft-sheet"
import { PublishSheet } from "./publish-sheet"
import { SaveDraftForm } from "./save-draft-form"

type WriteHeaderProps = {
  mode: "create" | "edit"
}

export const WriteHeader = ({ mode }: WriteHeaderProps) => {
  return (
    <header className="flex items-center justify-between border-b bg-background px-2 py-4 sm:px-7">
      <div className="flex items-center gap-3">
        <Link className={buttonVariants({ onlyIcon: true })} href="/">
          <Icons.ArrowLeft className="h-5 w-5" />
        </Link>
        <DraftSheet />
      </div>
      <div className="flex items-center gap-3">
        <SaveDraftForm />
        <PublishSheet />
      </div>
    </header>
  )
}
