import type { ZodSchema } from 'zod';

export function validateFormData<T>(
	formData: FormData,
	schema: ZodSchema<T>
):
	| {
			success: true;
			data: T;
	  }
	| {
			success: false;
			errorMessage: string;
	  } {
	const newFormData = Object.fromEntries(formData);
	const validated = schema.safeParse(newFormData);

	if (!validated.success) {
		return {
			success: false,
			errorMessage: validated.error.issues[0].message
		};
	}

	return { success: true, data: validated.data };
}

export function validate<T>(
	formData: URLSearchParams,
	schema: ZodSchema<T>
):
	| {
			success: true;
			data: T;
	  }
	| {
			success: false;
			errorMessage: string;
	  } {
	const newFormData = Object.fromEntries(formData);
	const validated = schema.safeParse(newFormData);

	if (!validated.success) {
		return {
			success: false,
			errorMessage: validated.error.issues[0].message
		};
	}

	return { success: true, data: validated.data };
}
