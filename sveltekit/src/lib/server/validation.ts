import type { ZodError, ZodSchema } from 'zod';

export function validateFormData<T>(formData: FormData, schema: ZodSchema<T>) {
	const newFormData = Object.fromEntries(formData);
	const validated = schema.safeParse(newFormData);

	return validated;
}

export function extractErrorMessage(error: ZodError) {
	return error.issues[0].message;
}
