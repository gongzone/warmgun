import type { Handle } from '@sveltejs/kit';

import {
	ACCESS_TOKEN_KEY,
	REFRESH_TOKEN_KEY,
	generateTokens,
	verifyToken,
	type AccessTokenPayload,
	type RefreshTokenPayload
} from '$lib/server/token';
import { getCurrentUser } from '$lib/server/user';
import { setAuthCookies } from '$lib/server/cookie';

// Todo: 가끔 앱 접속 시 로그인 안되는 문제 해결
export const handle = (async ({ event, resolve }) => {
	const accessToken = event.cookies.get(ACCESS_TOKEN_KEY);
	const refreshToken = event.cookies.get(REFRESH_TOKEN_KEY);

	if (accessToken) {
		const verifiedAccessToken = await verifyToken<AccessTokenPayload>(accessToken);
		const currentUser = verifiedAccessToken
			? await getCurrentUser(verifiedAccessToken.userId)
			: null;
		event.locals.user = currentUser;

		return await resolve(event);
	}

	if (!refreshToken) {
		event.locals.user = null;
		return await resolve(event);
	}

	const verfiedRefreshToken = await verifyToken<RefreshTokenPayload>(refreshToken);
	const currentUser = verfiedRefreshToken ? await getCurrentUser(verfiedRefreshToken.userId) : null;

	if (!currentUser) {
		event.locals.user = null;
		return await resolve(event);
	}

	const { accessToken: newAccessToken, refreshToken: newRefreshToken } = await generateTokens(
		currentUser
	);

	setAuthCookies(event.cookies, { accessToken: newAccessToken, refreshToken: newRefreshToken });

	event.locals.user = currentUser;

	return await resolve(event);
}) satisfies Handle;
