import { PUBLIC_CDN_DOMAIN } from '$env/static/public';

export async function uploadImage(file: File) {
	// Todo?: image file이 아닌 경우 에러 핸들링 && image 용량 제한 설정 및 에러 핸들링
	const presignedData = await getPresignedUrl(file.type);

	const formData = new FormData();
	Object.keys(presignedData.fields).forEach((key) => {
		formData.append(key, presignedData.fields[key]);
	});
	formData.append('file', file);

	await uploadImageToS3(presignedData.url, formData);

	return `${PUBLIC_CDN_DOMAIN}/${presignedData.fields['key']}`;
}

async function getPresignedUrl(contentType: string) {
	const { data: presignedData } = await fetch(`/api/image?type=${contentType}`, {
		method: 'GET',
		headers: { 'Content-Type': 'application/json' }
	}).then((res) => res.json());

	return presignedData;
}

async function uploadImageToS3(presignedUrl: string, formData: FormData) {
	return await fetch(presignedUrl, {
		method: 'POST',
		body: formData
	});
}
