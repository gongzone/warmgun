import type { Cookies } from '@sveltejs/kit';

import type { Token } from '$api/auth';

export const ACCESS_TOKEN_KEY = 'access_token';
export const REFRESH_TOKEN_KEY = 'refresh_token';

interface TokenData {
	accessToken: Token;
	refreshToken: Token;
}

export function setAuthCookie(cookies: Cookies, { accessToken, refreshToken }: TokenData) {
	cookies.set(ACCESS_TOKEN_KEY, accessToken.value, {
		...accessToken.config,
		expires: new Date(accessToken.config.expires)
	});
	cookies.set(REFRESH_TOKEN_KEY, refreshToken.value, {
		...refreshToken.config,
		expires: new Date(refreshToken.config.expires)
	});
}

export function deleteAuthCookie(cookies: Cookies) {
	cookies.delete(ACCESS_TOKEN_KEY, { path: '/' });
	cookies.delete(REFRESH_TOKEN_KEY, { path: '/' });
}
