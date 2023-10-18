import { useEffect } from "react"
import { experimental_useFormState as useFormState } from "react-dom"

import { type FormActionState } from "./types"

export type FormActionCallback = {
  onSuccess?: (state: FormActionState) => void
  onError?: (state: FormActionState) => void
}

const initialState = {
  type: null,
  message: null,
  data: null,
} satisfies FormActionState

export const useFormAction = (
  action: (state: unknown) => Promise<unknown>,
  callback?: FormActionCallback
) => {
  const formState = useFormState(action, initialState)
  const state = formState[0] as FormActionState
  const formAction = formState[1]

  useEffect(() => {
    if (state?.type === "success") {
      typeof callback?.onSuccess == "function" && callback.onSuccess(state)
    }

    if (state?.type === "error") {
      typeof callback?.onError == "function" && callback.onError(state)
    }
  }, [state])

  return { state, formAction }
}