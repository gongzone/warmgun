import type { Cookies } from '@sveltejs/kit';

import db from '$lib/server/db';
import {
	ACCESS_TOKEN_KEY,
	generateTokens,
	REFRESH_TOKEN_KEY,
	verifyToken,
	type RefreshTokenPayload
} from '$lib/server/token';
import { setAuthCookies } from '$lib/server/cookie';

export async function refreshAuth(cookies: Cookies) {
	const accessToken = cookies.get(ACCESS_TOKEN_KEY);
	const refreshToken = cookies.get(REFRESH_TOKEN_KEY);

	if (accessToken) {
		return accessToken;
	}

	if (!refreshToken) {
		return null;
	}

	const verfiedToken = await verifyToken<RefreshTokenPayload>(refreshToken);

	if (!verfiedToken) {
		return null;
	}

	const currentUser = await db.user.findUnique({
		where: {
			id: verfiedToken.userId
		}
	});

	if (!currentUser) {
		return null;
	}

	const { accessToken: newAccessToken, refreshToken: newRefreshToken } = await generateTokens(
		currentUser
	);

	setAuthCookies(cookies, { accessToken: newAccessToken, refreshToken: newRefreshToken });

	return { token: accessToken, user: currentUser };
}
