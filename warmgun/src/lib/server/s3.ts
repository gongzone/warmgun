import { S3Client } from '@aws-sdk/client-s3';
import { S3_BUCKET_REGION, S3_ACCESS_KEY, S3_SECRET_KEY } from '$env/static/private';

export const s3Client = new S3Client({
	credentials: {
		accessKeyId: S3_ACCESS_KEY,
		secretAccessKey: S3_SECRET_KEY
	},
	region: S3_BUCKET_REGION
});
