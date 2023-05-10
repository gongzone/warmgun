import { AutosizedTextarea } from "@/components/ui/autosized-textarea"
import { Separator } from "@/components/ui/seperator"
import { Editor } from "@/components/Editor/Editor"

export default function WritePage() {
  return (
    <div className="space-y-4">
      <section className="">
        <AutosizedTextarea name="title" placeholder="제목을 입력하세요." />
        <div className="px-3">
          <Separator className="" />
        </div>
      </section>

      <section>
        <Editor />
      </section>
    </div>
  )
}
