import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { env } from '$env/dynamic/private';

import cloudinary from '$lib/server/cloudinary';

interface PostBody {
	imageUrls: string[];
}

export const POST = (async ({ request, locals }) => {
	if (!locals.user) return json({ message: 'protected route' });
	const { imageUrls } = (await request.json()) as PostBody;

	function uploadImageToCloud(url: string) {
		return cloudinary.uploader.upload(url, {
			folder: `images/${locals.user?.username}/post`,
			quality: 'auto',
			width: 1280,
			height: 800,
			crop: 'limit'
		});
	}

	const cloudinaryResult = await Promise.all(imageUrls.map(uploadImageToCloud));
	const enhancedUrls = cloudinaryResult.map((data) =>
		env.NODE_ENV === 'production' ? data.secure_url : data.url
	);

	return json(enhancedUrls);
}) satisfies RequestHandler;
