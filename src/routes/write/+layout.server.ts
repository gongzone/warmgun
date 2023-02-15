// import type { LayoutServerLoad } from './$types';
// import { error } from '@sveltejs/kit';

// import { getDraftsByUserId } from './_load';

// export const load: LayoutServerLoad = async ({ locals, params }) => {
// 	if (!locals.user) {
// 		throw error(404);
// 	}

// 	const drafts = await getDraftsByUserId(locals.user.id);

// 	const enhancedWriter = {
// 		username: locals.user.username,
// 		nickname: locals.user.nickname,
// 		avatar: locals.user.avatar,
// 		drafts
// 	};

// 	return { writer: enhancedWriter, currentDraftId: params.draftId };
// };
