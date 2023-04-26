import type { Cookies } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';

import { tokenExpires } from '$lib/server/jwt';

export const COOKIE_ACCESS_TOKEN = 'access_token';
export const COOKIE_REFRESH_TOKEN = 'refresh_token';

export function setAuthCookies(
	cookies: Cookies,
	tokens: {
		accessToken: string;
		refreshToken: string;
	}
) {
	const { accessToken, refreshToken } = tokens;

	cookies.set(COOKIE_ACCESS_TOKEN, accessToken, {
		path: '/',
		httpOnly: true,
		sameSite: 'strict',
		secure: env.NODE_ENV === 'production',
		maxAge: tokenExpires['access'] / 1000
	});
	cookies.set(COOKIE_REFRESH_TOKEN, refreshToken, {
		path: '/',
		httpOnly: true,
		sameSite: 'strict',
		secure: env.NODE_ENV === 'production',
		maxAge: tokenExpires['refresh'] / 1000
	});
}

export function deleteAuthCookies(cookies: Cookies) {
	cookies.delete(COOKIE_ACCESS_TOKEN, { path: '/' });
	cookies.delete(COOKIE_REFRESH_TOKEN, { path: '/' });
}
