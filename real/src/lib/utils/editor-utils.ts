import type { OutputData } from '@editorjs/editorjs';

export function generateExcerpt(body: OutputData | null) {
	if (!body) return '';

	let excerpt = '';

	for (const item of body.blocks) {
		if (item.type === 'paragraph' || item.type === 'header') {
			excerpt = excerpt + ' ' + item.data.text;

			if (excerpt.length >= 100) {
				excerpt = excerpt.slice(0, 100);
				break;
			}
		} else {
			continue;
		}
	}

	return excerpt;
}