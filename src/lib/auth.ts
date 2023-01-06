import { redirect, type Cookies } from '@sveltejs/kit';

import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY, setAuthCookie } from '$lib/cookie';
import { refresh } from '$api/auth';

export async function requiredAuth(accessToken: string | null) {
	if (!accessToken) {
		throw redirect(302, '/auth/login');
	}
}

export async function isAlreadyLogin(accessToken: string | null) {
	if (accessToken) {
		throw redirect(302, '/');
	}
}

export async function refreshAuth(cookies: Cookies) {
	const cookieAccessToken = cookies.get(ACCESS_TOKEN_KEY);
	const cookieRefreshToken = cookies.get(REFRESH_TOKEN_KEY);

	if (cookieAccessToken) {
		return cookieAccessToken;
	}

	if (!cookieRefreshToken) {
		return null;
	}

	const { accessToken, refreshToken } = await refresh({ refreshToken: cookieRefreshToken });

	setAuthCookie(cookies, { accessToken, refreshToken });

	return accessToken.value;
}
