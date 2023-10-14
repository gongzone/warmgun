import { cn } from "@/lib/utils"

type DataFallbackProps = {
  wrapperClassName?: string
  textClassName?: string
  text?: string
}

export const DataFallback = ({
  wrapperClassName,
  textClassName,
  text,
}: DataFallbackProps) => {
  return (
    <div
      className={cn(
        "flex h-full w-full items-center justify-center border p-4 shadow-xl",
        wrapperClassName
      )}
    >
      <span className={cn("text-lg", textClassName)}>
        😅 {text ? text : "데이터가 존재하지 않습니다."}
      </span>
    </div>
  )
}
