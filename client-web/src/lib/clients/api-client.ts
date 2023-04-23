import ky from 'ky-universal';

const prefixUrl = import.meta.env.MODE === 'development' ? 'http://localhost:3000' : '';

export const refresh = async () => {
	await ky.post(`${prefixUrl}/api/auth/refresh`, {
		credentials: 'include'
	});
};

export const api = ky.extend({
	prefixUrl,
	retry: 0,
	credentials: 'include'
});
