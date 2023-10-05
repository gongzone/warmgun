const actionMessageType = {
  OK: "OK",
  UNAUTHORIZED: "UNAUTHORIZED",
} as const

export type ActionMessageType = keyof typeof actionMessageType
export type ActionMessage = {
  type: ActionMessageType
  message: string
}

export const actionMessage = (type: ActionMessageType, message: string) =>
  ({
    type: actionMessageType[type],
    message,
  }) satisfies ActionMessage
