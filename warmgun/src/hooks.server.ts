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
import { generateTokens, verifyToken, type TokenPayload, decodeToken } from '$lib/server/jwt';

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
	const verifiedAccessToken = await verifyToken('access', accessToken);
	if (!verifiedAccessToken) {
		return refreshAuth(cookies, {
			tokenId,
			refreshToken
		});
	}

	const user = await db.user.findUnique({
		where: {
			id: verifiedAccessToken.userId
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
	const verifiedRefreshToken = await verifyToken('refresh', refreshToken);
	if (!verifiedRefreshToken) {
		return null;
	}

	try {
		const {
			tokenId: newTokenId,
			accessToken: newAccessToken,
			refreshToken: newRefreshToken,
			user
		} = await rotateRefreshToken(tokenId, verifiedRefreshToken.userId, refreshToken);

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

async function rotateRefreshToken(tokenId: string, userId: number, refreshToken: string) {
	const token = await db.token.findUnique({
		where: {
			id_userId: {
				id: tokenId,
				userId
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
		if (dayjs().diff(token.updatedAt, 'seconds') < 60) {
			return {
				...(await updateToken(token.id, {
					userId: token.user.id,
					username: token.user.username,
					email: token.user.email,
					role: token.user.role
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
			username: token.user.username,
			email: token.user.email,
			role: token.user.role
		})),
		user: token.user
	};
}

async function updateToken(tokenId: string, payload: TokenPayload) {
	const { userId, username, email, role } = payload;
	const { accessToken, refreshToken } = await generateTokens({
		userId,
		username,
		email,
		role
	});
	const hashedRefreshToken = await argon2.hash(refreshToken);
	const decodedRefreshToken = await decodeToken(refreshToken);

	const updatedToken = await db.token.update({
		where: {
			id_userId: {
				id: tokenId,
				userId
			}
		},
		data: {
			refreshToken: hashedRefreshToken,
			expiresIn: decodedRefreshToken.exp,
			updatedAt: decodedRefreshToken.iat
		}
	});

	return {
		tokenId: updatedToken.id,
		accessToken,
		refreshToken
	};
}
