import { dateClient } from './date';

export function formatDate(date: Date) {
	return dateClient(date).fromNow();
}

export function formatCount(count: number) {
	return new Intl.NumberFormat('en-US', {
		maximumFractionDigits: 1,
		notation: 'compact',
		compactDisplay: 'short'
	}).format(count);
}

export function tagToSlug(tag: string) {
	return tag.trim().replace(' ', '-').toLowerCase();
}
