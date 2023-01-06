import type { Handle } from '@sveltejs/kit';

import { refreshAuth } from '$lib/auth';

const REFRESH_ROUTES = ['/(app)', '/auth'];

function isRefreshRoute(route: string | null) {
	if (!route) return false;

	return REFRESH_ROUTES.some((r) => route.startsWith(r));
}

export const handle = (async ({ event, resolve }) => {
	if (isRefreshRoute(event.route.id)) {
		console.log(`😅 해당 URL은 리프레시 라우트입니다: ${event.request.url}`);
		const accessToken = await refreshAuth(event.cookies);
		event.locals.accessToken = accessToken;
	}

	const response = await resolve(event);

	return response;
}) satisfies Handle;

// export const handleFetch = (async ({ event, request, fetch }) => {
// 	if (request.url.startsWith('https://api.my-domain.com/')) {
// 		request.headers.set('cookie', event.request.headers.get('cookie'));
// 	}

// 	console.log('fetch handler 작동');

// 	return fetch(request);
// }) satisfies HandleFetch;
