import { getUserByUsername } from '$api/user';
import type { LayoutLoad } from './$types';

export const load = (async ({ parent, params }) => {
	const { queryClient } = await parent();

	await queryClient.prefetchQuery({
		queryKey: ['user', params.page.slice(1)],
		queryFn: () => getUserByUsername(params.page.slice(1))
	});
}) satisfies LayoutLoad;
