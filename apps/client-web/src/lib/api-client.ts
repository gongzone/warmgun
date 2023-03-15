import ky from 'ky-universal';

const api = ky.extend({
	prefixUrl: import.meta.env.MODE === 'development' ? 'http://localhost:3000' : '',
	retry: 0,
	hooks: {
		beforeError: [
			async (error) => {
				const { error: responseError, message } = await error.response.json();

				error.name = responseError;
				error.message = Array.isArray(message) ? message[0] : message;

				return error;
			}
		]
	},
	credentials: 'include'
});

export default api;
