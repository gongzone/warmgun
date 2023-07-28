import type { ZodSchema } from 'zod';

export function validate<T>(
	formData: FormData | URLSearchParams,
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

export function generateFormMessage(isSuccess: boolean, message: string) {
	return { isSuccess, message };
}
