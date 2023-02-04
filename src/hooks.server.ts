import type { Handle } from '@sveltejs/kit';

import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY, verifyToken } from '$lib/server/token';

import { getLoggedInUser, refreshAuth } from './_hook';

export const handle = (async ({ event, resolve }) => {
	const accessToken = event.cookies.get(ACCESS_TOKEN_KEY);
	const refreshToken = event.cookies.get(REFRESH_TOKEN_KEY);

	if (accessToken) {
		const verifiedAccessToken = await verifyToken(accessToken);
		const currentUser = verifiedAccessToken
			? await getLoggedInUser(verifiedAccessToken.userId)
			: await refreshAuth(event.cookies, refreshToken);

		event.locals.user = currentUser;
		return await resolve(event);
	}

	event.locals.user = await refreshAuth(event.cookies, refreshToken);
	return await resolve(event);
}) satisfies Handle;
