export type FormActionState = {
  type?: "success" | "error" | null
  message?: string | null
  data?: unknown
}
