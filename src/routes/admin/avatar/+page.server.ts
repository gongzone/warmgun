import { createAvatar } from '$api/avatar';
import type { Actions } from './$types';

export const actions: Actions = {
	new: async ({ request, fetch }) => {
		const formData = await request.formData();
		console.log(formData.get('avatar'), request.headers);

		await createAvatar(formData);
	}
};
