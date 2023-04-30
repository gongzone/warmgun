import type { RequestHandler } from './$types';
import { error, json } from '@sveltejs/kit';
import { S3_BUCKET_NAME } from '$env/static/private';
import mime from 'mime-types';
import { nanoid } from 'nanoid';
import { createPresignedPost, type PresignedPostOptions } from '@aws-sdk/s3-presigned-post';

import { s3Client } from '$lib/server/s3';

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

export const GET = (async ({ locals, url }) => {
	if (!locals.user) {
		throw error(401, '접근 권한이 없습니다.');
	}

	const contentType = url.searchParams.get('type');

	if (!contentType) {
		throw error(400, '파일의 타입을 명시하여 주십시오.');
	}

	const key = `upload/${locals.user.username}/${nanoid()}.${mime.extension(contentType)}`;

	try {
		const presignedData = await createPresignedPost(
			s3Client,
			generatePresignedOptions(key, contentType)
		);
		return json({ data: presignedData });
	} catch {
		throw error(500, '이미지 업로드 중 문제가 발생하였습니다.');
	}
}) satisfies RequestHandler;
