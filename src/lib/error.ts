import type { HTTPError } from 'got';

interface ErrorResponse {
	name: string;
	message: string;
	statusCode: number;
}

export const errorNames = {
	validationError: 'ValidationError',
	userExists: 'UserExists',
	passwordsNotMatched: 'PasswordsNotMatched',
	wrongCredentials: 'WrongCredentials',
	unknown: 'Unknown',
	unauthorized: 'Unauthorized',
	badRequest: 'BadRequest',
	refreshFailure: 'RefreshFailure',
	notFound: 'NotFound',
	forbidden: 'Forbidden',
	invalidURL: 'InvalidURL',
	alreadyExists: 'AlreadyExists'
};

export function extractError(err: unknown) {
	const typedError = err as HTTPError;

	return typedError.response.body as ErrorResponse;
}
