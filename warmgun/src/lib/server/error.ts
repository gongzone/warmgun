import { fail } from '@sveltejs/kit';

export function triggerFail(statusCode: number, message: string) {
	return fail(statusCode, {
		success: false,
		message: message
	});
}
