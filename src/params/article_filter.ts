import type { ParamMatcher } from '@sveltejs/kit';

export const match = ((param) => {
	return ['trending', 'recent', 'best'].includes(param);
}) satisfies ParamMatcher;
