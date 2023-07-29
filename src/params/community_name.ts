import type { ParamMatcher } from '@sveltejs/kit';
import { communities } from '$lib/constants/communities';

export const match = ((param) => {
	return Object.keys(communities)
		.map((communityEnum) => communityEnum.toLowerCase())
		.includes(param);
}) satisfies ParamMatcher;
