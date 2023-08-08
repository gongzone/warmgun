import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ url }) => {
	const q = url.searchParams.get('q') ?? '';
	return { q };
};
