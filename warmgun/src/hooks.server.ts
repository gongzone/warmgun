import { error, type Cookies, type Handle } from '@sveltejs/kit';
import argon2 from 'argon2';
import dayjs from 'dayjs';

import { db } from '$lib/server/db';
import {
	COOKIE_TOKEN_ID,
	COOKIE_ACCESS_TOKEN,
	COOKIE_REFRESH_TOKEN,
	setAuthCookies,
	deleteAuthCookies
} from '$lib/server/cookie';
import { generateTokens, verifyToken, type TokenPayloadReturn } from '$lib/server/jwt';
import { currentUserSelect } from '$lib/server/population/user';

export const handle: Handle = async ({ event, resolve }) => {
	const tokenId = event.cookies.get(COOKIE_TOKEN_ID);
	const accessToken = event.cookies.get(COOKIE_ACCESS_TOKEN);
	const refreshToken = event.cookies.get(COOKIE_REFRESH_TOKEN);

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

async function refreshAuth(
	cookies: Cookies,
	{ tokenId, refreshToken }: { tokenId: string; refreshToken: string }
) {
	const payload = await verifyToken('refresh', refreshToken);
	if (!payload) {
		return null;
	}

	try {
		const {
			accessToken: newAccessToken,
			refreshToken: newRefreshToken,
			user
		} = await rotateRefreshToken(tokenId, refreshToken, payload);

		setAuthCookies(cookies, {
			tokenId,
			accessToken: newAccessToken,
			refreshToken: newRefreshToken
		});

		return user;
	} catch (err) {
		deleteAuthCookies(cookies);
		throw err;
	}
}

async function rotateRefreshToken(
	tokenId: string,
	refreshToken: string,
	payload: TokenPayloadReturn
) {
	const token = await db.token.findUnique({
		where: { id_userId: { id: tokenId, userId: payload.userId } },
		include: { user: { select: currentUserSelect } }
	});

	if (!token) {
		throw error(401, '해당 인증 토큰을 찾을 수 없습니다.');
	}

	const match = await argon2.verify(token.refreshToken, refreshToken);

	if (!match && dayjs().diff(new Date(payload.iat * 1000), 'seconds') > 60) {
		await db.token.deleteMany({ where: { userId: token.userId } });
		throw error(403, '비정상적인 인증 토큰 갱신 요청으로 강제 로그아웃 됩니다.');
	}

	const { accessToken: newAccessToken, refreshToken: newRefreshToken } = await generateTokens({
		userId: token.user.id,
		username: token.user.username
	});
	const hashedRefreshToken = await argon2.hash(newRefreshToken);

	await db.token.update({
		where: { id_userId: { id: tokenId, userId: token.user.id } },
		data: { refreshToken: hashedRefreshToken }
	});

	return {
		accessToken: newAccessToken,
		refreshToken: newRefreshToken,
		user: token.user
	};
}

export async function findCurrentUser(userId: number) {
	const user = await db.user.findUnique({
		where: { id: userId },
		select: currentUserSelect
	});

	return user;
}
