import { type FormActionState } from "./types"

export const actionResponse = (state: FormActionState) => {
  return state
}

export const errorMessages = {
  AUTHENTICATED_FAIL: "유저 정보를 찾을 수 없습니다. 다시 로그인 해주세요.",
} as const
