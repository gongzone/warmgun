import type { Cookies } from '@sveltejs/kit';
import db from '$lib/server/db';
import { generateTokens, verifyToken } from '$lib/server/token';

import { setAuthCookies } from '$lib/server/cookie';
import type { LoggedInUser } from '$lib/types/user';

const userCache = new Map<number, LoggedInUser>();

export async function getLoggedInUser(userId: number) {
	if (userCache.has(userId)) {
		return userCache.get(userId) as LoggedInUser;
	}

	const user = await db.user.findUnique({
		where: {
			id: userId
		},
		select: {
			id: true,
			username: true,
			email: true,
			role: true,
			profile: {
				select: {
					nickname: true,
					avatar: true
				}
			},
			drafts: {
				take: 1,
				select: {
					id: true
				},
				orderBy: {
					updatedAt: 'desc'
				}
			}
		}
	});

	if (!user || !user.profile) {
		return null;
	}

	const enhancedUser = {
		id: user.id,
		username: user.username,
		email: user.email,
		role: user.role,
		nickname: user.profile.nickname,
		avatar: user.profile.avatar,
		latestDraftId: user.drafts[0].id
	} satisfies LoggedInUser;

	userCache.set(userId, enhancedUser);

	return enhancedUser;
}

export async function refreshAuth(cookies: Cookies, refreshToken: string | undefined) {
	if (!refreshToken) {
		return null;
	}

	const verfiedRefreshToken = await verifyToken(refreshToken);
	const currentUser = verfiedRefreshToken
		? await getLoggedInUser(verfiedRefreshToken.userId)
		: null;

	if (!currentUser) {
		return null;
	}

	const { accessToken: newAccessToken, refreshToken: newRefreshToken } = await generateTokens(
		currentUser.id
	);

	setAuthCookies(cookies, { accessToken: newAccessToken, refreshToken: newRefreshToken });

	return currentUser;
}
