import { Button } from "@/components/ui/button"
import { Icons } from "@/components/ui/icons"

export function WriteHeader() {
  return (
    <header className="flex items-center justify-between px-2 py-4 sm:px-6">
      <div className="flex items-center gap-2">
        <Button variant="ghost" className="h-12 w-12 p-0">
          <Icons.arrowLeft className="h-6 w-6" />
        </Button>
        <Button variant="outline" className="h-12 w-12 border-2 p-0">
          <Icons.article className="h-6 w-6" />
        </Button>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="secondary" size="lg">
          저장
        </Button>
        <Button variant="default" size="lg">
          글 등록
        </Button>
      </div>
    </header>
  )
}
