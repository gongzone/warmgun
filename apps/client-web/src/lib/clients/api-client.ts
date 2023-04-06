import ky, { type AfterResponseHook } from 'ky-universal';

const prefixUrl = import.meta.env.MODE === 'development' ? 'http://localhost:3000' : '';

export const refresh = async () => {
	await ky.post(`${prefixUrl}/api/auth/refresh`, {
		credentials: 'include'
	});
};

const responseHandler: AfterResponseHook = async (request, options, response) => {
	if (response.status === 401) {
		try {
			await refresh();
			return ky(request);
		} catch (err) {
			if (response.url === `${prefixUrl}/api/me`) {
				return new Response(null, { status: 200 });
			}

			if (response.url === `${prefixUrl}/api/me/drafts`) {
				return new Response(null, { status: 200 });
			}
			return response;
		}
	}
	return response;
};

export const api = ky.extend({
	prefixUrl,
	retry: 0,
	credentials: 'include',
	hooks: {
		afterResponse: [responseHandler]
	}
});
