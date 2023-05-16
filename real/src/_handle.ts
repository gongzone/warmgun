import { prisma } from '$lib/server/db';
import { error, type Cookies } from '@sveltejs/kit';
import argon2 from 'argon2';
import dayjs from 'dayjs';

import { verifyToken, type TokenPayloadReturn, generateTokens } from '$lib/server/jwt';
import { currentUserSelect } from '$lib/types/user';
import { deleteAuthCookies, setAuthCookies } from '$lib/server/cookie';

export async function findCurrentUser(userId: number) {
	const user = await prisma.user.findUnique({
		where: { id: userId },
		select: currentUserSelect
	});

	return user;
}

export async function refreshAuth(
	cookies: Cookies,
	{ tokenId, refreshToken }: { tokenId: string; refreshToken: string }
) {
	const payload = await verifyToken('refresh', refreshToken);
	if (!payload) return null;

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
	const foundToken = await prisma.token.findUnique({
		where: { id_userId: { id: tokenId, userId: payload.userId } }
	});

	if (!foundToken) {
		await prisma.token.deleteMany({ where: { userId: payload.userId } });
		throw error(401, '해당 인증 토큰을 찾을 수 없습니다. 다시 로그인해주세요.');
	}

	const match = await argon2.verify(foundToken.refreshToken, refreshToken);

	if (!match && dayjs().diff(new Date(payload.iat * 1000), 'seconds') > 60) {
		await prisma.token.deleteMany({ where: { userId: payload.userId } });
		throw error(403, '비정상적인 인증 토큰 갱신 요청으로 강제 로그아웃 됩니다.');
	}

	const { accessToken: newAccessToken, refreshToken: newRefreshToken } = await generateTokens({
		userId: payload.userId,
		username: payload.username
	});
	const hashedRefreshToken = await argon2.hash(newRefreshToken);

	const updatedToken = await prisma.token.update({
		where: { id_userId: { id: tokenId, userId: payload.userId } },
		data: { refreshToken: hashedRefreshToken },
		include: { user: { select: currentUserSelect } }
	});

	return {
		accessToken: newAccessToken,
		refreshToken: newRefreshToken,
		user: updatedToken.user
	};
}
