type ImageType = 'avatar' | 'article' | 'article-cover';

const getPresignedUrl = async (imageFor: ImageType, contentType: string) => {
	const { data: presignedData } = await fetch('/api/s3/presigned', {
		method: 'POST',
		body: JSON.stringify({ imageFor, contentType }),
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

export async function uploadImage(file: File, options: { imageFor: ImageType }) {
	// Todo?: image file이 아닌 경우 에러 핸들링 && image 용량 제한 설정 및 에러 핸들링
	const presignedData = await getPresignedUrl(options.imageFor, file.type);

	const formData = new FormData();
	Object.keys(presignedData.fields).forEach((key) => {
		formData.append(key, presignedData.fields[key]);
	});

	formData.append('file', file);
	await uploadImageToS3(presignedData.url, formData);

	// Todo: lamda@edge 이용하여 on-the-fly 이미지 리사이징 구현하기
	return presignedData.fields['key'];
}
