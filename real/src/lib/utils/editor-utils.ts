import type { OutputData } from '@editorjs/editorjs';

export function generateExcerpt(body: OutputData | null) {
	if (!body) return '';

	let excerpt = '';

	for (const item of body.blocks) {
		if (item.type === 'paragraph' || item.type === 'header') {
			excerpt = excerpt + ' ' + item.data.text;

			if (excerpt.length >= 120) {
				excerpt = excerpt.slice(0, 120);
				break;
			}
		} else {
			continue;
		}
	}

	return excerpt;
}

export function bodyToString(body: OutputData | null) {
	if (!body) return '';

	let bodyString = '';

	for (const item of body.blocks) {
		if (item.type === 'paragraph' || item.type === 'header') {
			bodyString = bodyString + ' ' + item.data.text;
		} else {
			continue;
		}
	}

	return bodyString;
}
