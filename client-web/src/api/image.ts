import { api } from '$lib/clients/api-client';
import { CDN_DOMAIN } from '$lib/constants/cdn';

async function createPresignedUrl(contentType: string) {
	return await api
		.post('api/image/presigned', { json: { contentType } })
		.json<CreatePresignedUrlResult>();
}

async function uploadImageToS3(presignedUrl: string, formData: FormData) {
	return await fetch(presignedUrl, {
		method: 'POST',
		body: formData
	});
}

export async function uploadImage(file: File) {
	// Todo?: image file이 아닌 경우 에러 핸들링 && image 용량 제한 설정 및 에러 핸들링
	const presignedData = await createPresignedUrl(file.type);

	const formData = new FormData();
	Object.keys(presignedData.fields).forEach((key) => {
		formData.append(key, presignedData.fields[key]);
	});
	formData.append('file', file);

	await uploadImageToS3(presignedData.url, formData);

	return `${CDN_DOMAIN}/${presignedData.fields['key']}`;
}

interface CreatePresignedUrlResult {
	url: string;
	fields: {
		[key: string]: string;
	};
}
