import type { Handle } from '@sveltejs/kit';

export const handle = (async ({ event, resolve }) => {
	console.log('hooks!');
	return await resolve(event);
}) satisfies Handle;
