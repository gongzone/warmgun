import type { Handle, Cookies } from '@sveltejs/kit';

import db from '$lib/server/db';
import {
	ACCESS_TOKEN_KEY,
	REFRESH_TOKEN_KEY,
	generateTokens,
	verifyToken
} from '$lib/server/token';
import { setAuthCookies } from '$lib/server/cookie';
import type { CurrentUser } from '$lib/types/current-user';

const userCache = new Map<number, CurrentUser>();

async function getCurrentUser(userId: number) {
	if (userCache.has(userId)) {
		return userCache.get(userId) as CurrentUser;
	}

	const currentUser = await db.user.findUnique({
		where: {
			id: userId
		},
		select: {
			id: true,
			username: true,
			role: true
		}
	});

	userCache.set(userId, currentUser);

	return currentUser;
}

async function refreshAuth(cookies: Cookies, refreshToken: string | undefined) {
	if (!refreshToken) {
		return null;
	}

	const verfiedRefreshToken = await verifyToken(refreshToken);
	const currentUser = verfiedRefreshToken ? await getCurrentUser(verfiedRefreshToken.userId) : null;

	if (!currentUser) {
		return null;
	}

	const { accessToken: newAccessToken, refreshToken: newRefreshToken } = await generateTokens(
		currentUser.id
	);

	setAuthCookies(cookies, { accessToken: newAccessToken, refreshToken: newRefreshToken });

	return currentUser;
}

export const handle = (async ({ event, resolve }) => {
	const accessToken = event.cookies.get(ACCESS_TOKEN_KEY);
	const refreshToken = event.cookies.get(REFRESH_TOKEN_KEY);

	if (accessToken) {
		const verifiedAccessToken = await verifyToken(accessToken);
		const currentUser = verifiedAccessToken
			? await getCurrentUser(verifiedAccessToken.userId)
			: await refreshAuth(event.cookies, refreshToken);

		event.locals.user = currentUser;
		return await resolve(event);
	}

	event.locals.user = await refreshAuth(event.cookies, refreshToken);
	return await resolve(event);
}) satisfies Handle;
