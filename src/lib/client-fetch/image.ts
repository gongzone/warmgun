const getPresignedUrl = async (contentType: string) => {
	const { data: presignedData } = await fetch('/api/s3/presigned', {
		method: 'POST',
		body: JSON.stringify({ contentType }),
		headers: { 'Content-Type': 'application/json' }
	}).then((res) => res.json());

	return presignedData;
};

const uploadImageToS3 = async (presignedUrl: string, formData: FormData) => {
	return await fetch(presignedUrl, {
		method: 'POST',
		body: formData
	});
};

export async function uploadImage(file: File) {
	// Todo?: image file이 아닌 경우 에러 핸들링 && image 용량 제한 설정 및 에러 핸들링
	const presignedData = await getPresignedUrl(file.type);

	const formData = new FormData();
	Object.keys(presignedData.fields).forEach((key) => {
		formData.append(key, presignedData.fields[key]);
	});
	formData.append('file', file);

	await uploadImageToS3(presignedData.url, formData);

	return presignedData.fields['key'];
}
