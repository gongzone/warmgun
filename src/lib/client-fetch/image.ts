import { convertBlobToBase64 } from '$lib/utils/base64';

// 임시 업로드 function, 내 이미지 캐시 서버 구축하면 바뀔 예정

export async function uploadImages(files: File[]) {
	console.log(files);

	const encodedUrls = await Promise.all(
		files.map((file: File) => convertBlobToBase64(file) as Promise<string>)
	);

	// Todo: loading spinner 작동 필요
	const response = await fetch('/api/images', {
		method: 'POST',
		body: JSON.stringify({ imageUrls: encodedUrls }),
		headers: {
			'content-type': 'application/json'
		}
	});

	const urls: string[] = await response.json();

	return urls;
}
