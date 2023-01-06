import got from 'got';

// cache?

export const client = got.extend({
	prefixUrl: 'http://localhost:4000',
	responseType: 'json',
	retry: {
		limit: 0
	}
});
