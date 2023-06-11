import type { ParamMatcher } from '@sveltejs/kit';

export const match = ((param) => {
	return ['like', 'following'].includes(param);
}) satisfies ParamMatcher;
