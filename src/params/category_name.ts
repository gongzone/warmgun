import type { ParamMatcher } from '@sveltejs/kit';
import { categories } from '$lib/constants/categories';

export const match = ((param) => {
	return Object.values(categories)
		.map((category) => category.slug)
		.includes(param);
}) satisfies ParamMatcher;
