import mime from 'mime-types';
import { v4 as uuidv4 } from 'uuid';
import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { S3_BUCKET_NAME } from '$env/static/private';
import { createPresignedPost, type PresignedPostOptions } from '@aws-sdk/s3-presigned-post';

import s3Client from '$lib/server/s3';

const generatePresignedOptions = (key: string, contentType: string) => {
	return {
		Bucket: S3_BUCKET_NAME,
		Key: key,
		Conditions: [
			['starts-with', '$Content-Type', 'image/'], // only image
			['content-length-range', 0, 10000000] // 0 - 10MB
		],
		Fields: {
			'Content-Type': contentType
		}
	} satisfies PresignedPostOptions;
};

export const POST = (async ({ request, locals }) => {
	if (!locals.user) {
		throw error(401);
	}

	const { username } = locals.user;
	const { contentType } = await request.json();

	const key = `upload/${username}/${uuidv4()}.${mime.extension(contentType)}`;

	// Todo: 실패 시 에러 처리
	const data = await createPresignedPost(s3Client, generatePresignedOptions(key, contentType));
	return json({ data });
}) satisfies RequestHandler;
