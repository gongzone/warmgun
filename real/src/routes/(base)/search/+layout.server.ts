import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ url }) => {
	return { q: url.searchParams.get('q') ?? undefined };
};
