import type { LayoutServerLoad } from './$types';
import { isAlreadyLogin } from '$lib/auth';

// export const load = (async ({ request, cookies, locals, url }) => {
// 	console.log('auth loader 작동');
// 	await isAlreadyLogin(locals.accessToken);

// 	return null;
// }) satisfies LayoutServerLoad;
