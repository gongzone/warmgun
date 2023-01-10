import type { Cookies } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';

import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY, tokensDuration } from '$lib/server/token';

interface Tokens {
	accessToken: string;
	refreshToken: string;
}

export function setAuthCookies(cookies: Cookies, { accessToken, refreshToken }: Tokens) {
	cookies.set(ACCESS_TOKEN_KEY, accessToken, {
		path: '/',
		httpOnly: true,
		sameSite: 'strict',
		secure: env.NODE_ENV === 'production',
		maxAge: tokensDuration[ACCESS_TOKEN_KEY] / 1000
	});
	cookies.set(REFRESH_TOKEN_KEY, refreshToken, {
		path: '/',
		httpOnly: true,
		sameSite: 'strict',
		secure: env.NODE_ENV === 'production',
		maxAge: tokensDuration[REFRESH_TOKEN_KEY] / 1000
	});
}
