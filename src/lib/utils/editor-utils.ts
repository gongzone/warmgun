import type { OutputData } from '@editorjs/editorjs';

export function bodyToString(body: OutputData | null) {
	if (!body) return '';

	let bodyString = '';

	// TODO: MARKER 기울임체 볼드체 등 파싱 문제 해결 필요
	for (const item of body.blocks) {
		if (item.type === 'paragraph' || item.type === 'header') {
			bodyString =
				bodyString +
				' ' +
				item.data.text.replace(
					/<b>|<\/b>|<i>|<\/i>|<u class="cdx-underline">|<\/u>|<mark class="cdx-marker">|<\/mark>|&nbsp;/g,
					''
				);
		} else {
			continue;
		}
	}

	return bodyString;
}

export function generateExcerpt(bodyString: string) {
	const maxLength = 120;
	const excerpt = bodyString.length >= maxLength ? bodyString.slice(0, 120) : bodyString;

	return excerpt;
}

export function calculateReadingTime(bodyString: string) {
	const wordsPerMinute = 265;
	const words = bodyString.trim().split(/\s+/).length;
	const time = Math.ceil(words / wordsPerMinute);

	return time;
}
