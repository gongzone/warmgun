import { type ZodError, type ZodSchema } from 'zod'

type FormErrors<T> = Partial<Record<keyof T, string>>

export async function formValidator<FormInput>(formData: FormData, schema: ZodSchema) {
  const body = Object.fromEntries(formData)

  try {
    const data = schema.parse(body) as FormInput
    return { validatedData: data, errors: null }
  } catch (err) {
    const errors = err as ZodError

    return {
      validatedData: body,
      errors: errors.issues.reduce((acc: FormErrors<FormInput>, curr) => {
        const key = curr.path[0] as keyof FormInput
        acc[key] = curr.message

        return acc
      }, {}),
    }
  }
}
