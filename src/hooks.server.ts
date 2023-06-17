import type { Handle } from '@sveltejs/kit';

import { COOKIE_TOKEN_ID, COOKIE_ACCESS_TOKEN, COOKIE_REFRESH_TOKEN } from '$lib/server/cookie';
import { verifyToken } from '$lib/server/jwt';

import { findCurrentUser, refreshAuth } from './_handle';

export const handle: Handle = async ({ event, resolve }) => {
	const tokenId = event.cookies.get(COOKIE_TOKEN_ID);
	const accessToken = event.cookies.get(COOKIE_ACCESS_TOKEN);
	const refreshToken = event.cookies.get(COOKIE_REFRESH_TOKEN);

	console.log('tokens', tokenId, accessToken, refreshToken);
	console.log('event', event, event.cookies.getAll());

	if (!tokenId || !refreshToken) {
		event.locals.user = null;
		return await resolve(event);
	}

	if (accessToken) {
		const payload = await verifyToken('access', accessToken);
		event.locals.user = payload
			? await findCurrentUser(payload.userId)
			: await refreshAuth(event.cookies, { tokenId, refreshToken });
		return await resolve(event);
	}

	event.locals.user = await refreshAuth(event.cookies, { tokenId, refreshToken });
	return await resolve(event);
};
