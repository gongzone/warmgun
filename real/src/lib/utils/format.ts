import { dateClient } from './date';

export function formatDate(date: Date) {
	return dateClient(date).fromNow();
}

export function tagToSlug(tag: string) {
	return tag.trim().replace(' ', '-').toLowerCase();
}
