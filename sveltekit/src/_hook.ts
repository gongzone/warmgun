import type { Cookies } from '@sveltejs/kit';
import db from '$lib/server/db';
import { generateTokens, verifyToken } from '$lib/server/token';

import { setAuthCookies } from '$lib/server/cookie';

export async function getAuthenticatedUser(userId: number) {
	return await db.userAuth.findUnique({
		where: {
			id: userId
		}
	});
}

export async function refreshAuth(cookies: Cookies, refreshToken: string | undefined) {
	if (!refreshToken) {
		return null;
	}

	const verifiedRefreshToken = await verifyToken(refreshToken);
	const authenticatedUser = verifiedRefreshToken
		? await getAuthenticatedUser(verifiedRefreshToken.userId)
		: null;

	if (!authenticatedUser) {
		return null;
	}

	const { accessToken: newAccessToken, refreshToken: newRefreshToken } = await generateTokens(
		authenticatedUser.id
	);
	setAuthCookies(cookies, { accessToken: newAccessToken, refreshToken: newRefreshToken });

	return authenticatedUser;
}
