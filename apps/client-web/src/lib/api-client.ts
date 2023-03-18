import ky, { type AfterResponseHook, type BeforeErrorHook } from 'ky-universal';

const prefixUrl = import.meta.env.MODE === 'development' ? 'http://localhost:3000' : '';

const errorHandler: BeforeErrorHook = async (error) => {
	// const { error: responseError, message, statusCode } = await error.response.clone().json();

	// error.name = responseError;
	// error.message = Array.isArray(message) ? message[0] : message;

	return error;
};

const responseHandler: AfterResponseHook = async (request, options, response) => {
	if (response.status === 401) {
		try {
			await ky.post(`${prefixUrl}/api/auth/refresh`, {
				credentials: 'include'
			});
			return ky(request);
		} catch (err) {
			if (response.url === `${prefixUrl}/api/me`) {
				return new Response(null, { status: 200 });
			}

			return response;
		}
	}

	return response;
};

export const api = ky.create({
	prefixUrl,
	retry: 0,
	credentials: 'include',
	hooks: {
		beforeError: [errorHandler]
	}
});

export const apiAfterRefresh = api.extend({
	retry: 0,
	credentials: 'include',
	hooks: {
		beforeError: [errorHandler],
		afterResponse: [responseHandler]
	}
});
