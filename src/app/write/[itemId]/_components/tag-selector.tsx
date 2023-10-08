"use client"

import { InputChip } from "@/components/@ui/input-chip"
import { useToast } from "@/components/@ui/use-toast"

import { useWriteContext } from "../_lib/store"

export const TagSelector = () => {
  const addToTags = useWriteContext((state) => state.addToTags)
  const removeToTags = useWriteContext((state) => state.removeFromTags)
  const { toast } = useToast()

  const triggerToast = (message: string) => {
    toast({
      title: "태그 설정 오류",
      description: message,
    })
  }
  const formatTag = (tag: string) => {
    const value = tag.replace(/  +/g, " ").trim().toLowerCase()
    const newValue = value
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")

    return newValue
  }

  const validateTag = (tag: string) => {
    return /^[0-9가-힣A-Za-z\s\-]+$/.test(tag)
  }

  return (
    <InputChip
      placeholder="원하는 태그를 설정하세요 (엔터키)"
      maxChips={5}
      format={(chip) => formatTag(chip)}
      validate={(chip) => validateTag(chip)}
      onAdd={(chip) => addToTags(chip)}
      onRemove={(chip) => removeToTags(chip)}
      onInvalid={(type) => {
        switch (type) {
          case "MAXCHIPS_FAIL":
            triggerToast("태그는 최대 5개까지 설정 가능합니다.")
            break
          case "VALIDATE_FAIL":
            triggerToast(
              "태그는 오직 문자와 숫자, 그리고 대쉬와 공백으로만 설정할 수 있습니다."
            )
            break
          case "DUPLICATE_FAIL":
            triggerToast("기존에 설정한 태그와 중복되는 태그입니다.")
            break
          default:
            triggerToast("태그 설정 중 문제가 발생했습니다.")
        }
      }}
    />
  )
}
