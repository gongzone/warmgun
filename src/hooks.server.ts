import type { Handle } from '@sveltejs/kit';

import db from '$lib/server/db';
import {
	ACCESS_TOKEN_KEY,
	REFRESH_TOKEN_KEY,
	generateTokens,
	verifyToken,
	type AccessTokenPayload,
	type RefreshTokenPayload
} from '$lib/server/token';
import { setAuthCookies } from '$lib/server/cookie';

// export const userCache = new Map();

export async function getCurrentUser(userId: number) {
	// if (userCache.has(userId)) {
	// 	return userCache.get(userId);
	// }

	const currentUser = await db.user.findUnique({
		where: {
			id: userId
		},
		select: {
			id: true,
			username: true,
			email: true,
			role: true,
			character: {
				select: {
					name: true,
					level: true,
					class: true,
					mainAvatar: true,
					avatars: true
				}
			},
			drafts: {
				select: {
					id: true,
					title: true,
					description: true,
					updatedAt: true
				},
				orderBy: { updatedAt: 'desc' }
			}
		}
	});

	// userCache.set(userId, currentUser);

	return currentUser;
}

// Todo: clear user cache function needed to add

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

	const { accessToken: newAccessToken, refreshToken: newRefreshToken } = await generateTokens({
		id: currentUser.id,
		username: currentUser.username,
		email: currentUser.email
	});

	setAuthCookies(event.cookies, { accessToken: newAccessToken, refreshToken: newRefreshToken });

	event.locals.user = currentUser;

	return await resolve(event);
}) satisfies Handle;
