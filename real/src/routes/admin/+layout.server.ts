import type { LayoutServerLoad } from './$types';
import { error } from '@sveltejs/kit';

export const load: LayoutServerLoad = async ({ locals }) => {
	if (!locals.user || locals.user?.role !== 'ADMIN') {
		throw error(404, '접근할 수 없는 페이지입니다.');
	}
};
