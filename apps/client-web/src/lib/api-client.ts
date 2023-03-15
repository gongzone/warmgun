import ky from 'ky-universal';

const prefixUrl = import.meta.env.MODE === 'development' ? 'http://localhost:3000' : '';

const api = ky.extend({
	prefixUrl: prefixUrl,
	retry: 0,
	hooks: {
		beforeError: [
			async (error) => {
				const { error: responseError, message } = await error.response.json();

				error.name = responseError;
				error.message = Array.isArray(message) ? message[0] : message;

				return error;
			}
		],
		afterResponse: [
			async (request, options, response) => {
				if (response.status === 401) {
					const refreshResponse = await ky.post(`${prefixUrl}/api/auth/refresh`, {
						throwHttpErrors: false,
						credentials: 'include'
					});

					if (refreshResponse.ok) {
						return ky(request);
					}
				}

				return response;
			}
		]
	},
	credentials: 'include'
});

export default api;
