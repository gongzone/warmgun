import type { ParamMatcher } from '@sveltejs/kit';
import { genre } from '$lib/configs/genre';

export const match = ((param) => {
	return genre.map((g) => g.slug).includes(param);
}) satisfies ParamMatcher;
