import type { ZodSchema } from "zod"

export function validateFormData<T>(formData: FormData, schema: ZodSchema<T>) {
  const newFormData = Object.fromEntries(formData)
  const validated = schema.safeParse(newFormData)

  if (!validated.success) {
    throw new Error(validated.error.issues[0].message)
  }

  return validated.data
}
