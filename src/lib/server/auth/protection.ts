import { error, redirect, type RequestEvent } from '@sveltejs/kit';

export function handleUnauthenticated(
	event: RequestEvent,
	mode: 'redirect' | 'error' = 'redirect'
) {
	if (!event.locals.user) {
		if (mode === 'error') {
			throw error(401, '인증되지 않은 접근입니다. 로그인 후에 이용해주세요.');
		} else {
			const redirectTo = event.url.pathname + event.url.search;
			throw redirect(302, `/auth/login?redirectTo=${redirectTo}`);
		}
	}

	return event.locals.user;
}
