import { error, type Cookies, type Handle } from '@sveltejs/kit';
import argon2 from 'argon2';
import dayjs from 'dayjs';

import { db } from '$lib/server/db';
import {
	COOKIE_TOKEN_ID,
	COOKIE_ACCESS_TOKEN,
	COOKIE_REFRESH_TOKEN,
	setAuthCookies
} from '$lib/server/cookie';
import {
	generateTokens,
	verifyToken,
	type TokenPayload,
	type TokenPayloadRetun
} from '$lib/server/jwt';

export const handle: Handle = async ({ event, resolve }) => {
	const tokenId = event.cookies.get(COOKIE_TOKEN_ID);
	const accessToken = event.cookies.get(COOKIE_ACCESS_TOKEN);
	const refreshToken = event.cookies.get(COOKIE_REFRESH_TOKEN);

	if (!tokenId || !refreshToken) {
		event.locals.user = null;
		return await resolve(event);
	}

	if (accessToken) {
		event.locals.user = await authByAccessToken(event.cookies, {
			tokenId,
			accessToken,
			refreshToken
		});
		return await resolve(event);
	}

	event.locals.user = await refreshAuth(event.cookies, {
		tokenId,
		refreshToken
	});
	return await resolve(event);
};

async function authByAccessToken(
	cookies: Cookies,
	{
		tokenId,
		accessToken,
		refreshToken
	}: {
		tokenId: string;
		accessToken: string;
		refreshToken: string;
	}
) {
	const payload = await verifyToken('access', accessToken);
	if (!payload) {
		return refreshAuth(cookies, {
			tokenId,
			refreshToken
		});
	}

	const user = await db.user.findUnique({
		where: {
			id: payload.userId
		},
		select: {
			id: true,
			username: true,
			email: true,
			role: true,
			profile: true
		}
	});
	if (!user) {
		return null;
	}

	return user;
}

async function refreshAuth(
	cookies: Cookies,
	{
		tokenId,
		refreshToken
	}: {
		tokenId: string;
		refreshToken: string;
	}
) {
	const payload = await verifyToken('refresh', refreshToken);
	if (!payload) {
		return null;
	}

	try {
		const {
			tokenId: newTokenId,
			accessToken: newAccessToken,
			refreshToken: newRefreshToken,
			user
		} = await rotateRefreshToken(tokenId, refreshToken, payload);

		setAuthCookies(cookies, {
			tokenId: newTokenId,
			accessToken: newAccessToken,
			refreshToken: newRefreshToken
		});

		return user;
	} catch {
		return null;
	}
}

async function rotateRefreshToken(
	tokenId: string,
	refreshToken: string,
	payload: TokenPayloadRetun
) {
	const token = await db.token.findUnique({
		where: {
			id_userId: {
				id: tokenId,
				userId: payload.userId
			}
		},
		include: {
			user: {
				select: {
					id: true,
					username: true,
					email: true,
					role: true,
					profile: true
				}
			}
		}
	});
	if (!token) {
		throw error(401, '해당 인증 토큰을 찾을 수 없습니다.');
	}

	const match = await argon2.verify(token.refreshToken, refreshToken);
	if (!match) {
		// leaway
		if (dayjs().diff(new Date(payload.iat * 1000), 'seconds') < 60) {
			return {
				...(await updateToken(token.id, {
					userId: token.user.id,
					username: token.user.username
				})),
				user: token.user
			};
		}

		// block
		await db.token.deleteMany({
			where: {
				userId: token.userId
			}
		});

		throw error(403, '비정상적인 인증 토큰 갱신 요청으로 강제 로그아웃 됩니다.');
	}

	return {
		...(await updateToken(token.id, {
			userId: token.user.id,
			username: token.user.username
		})),
		user: token.user
	};
}

async function updateToken(tokenId: string, payload: TokenPayload) {
	const { userId, username } = payload;
	const { accessToken, refreshToken } = await generateTokens({
		userId,
		username
	});
	const hashedRefreshToken = await argon2.hash(refreshToken);

	const updatedToken = await db.token.update({
		where: {
			id_userId: {
				id: tokenId,
				userId
			}
		},
		data: { refreshToken: hashedRefreshToken }
	});

	return {
		tokenId: updatedToken.id,
		accessToken,
		refreshToken
	};
}
