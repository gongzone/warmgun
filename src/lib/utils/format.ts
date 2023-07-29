import { nanoid } from 'nanoid';
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

export function formatSlug(title: string) {
	return `${title.trim().replace(/\s+/g, '-').toLowerCase()}-${nanoid()}`;
}

export function formatTagSlug(tag: string) {
	return tag.trim().replace(/\s+/g, '-').toLowerCase();
}

export function formatExcerpt(plaintext: string) {
	const maxLength = 200;
	const excerpt = plaintext.length >= maxLength ? plaintext.slice(0, maxLength) : plaintext;

	return excerpt;
}

export function formatReadingTime(plaintext: string) {
	const wordsPerMinute = 265;
	const words = plaintext.trim().split(/\s+/).length;
	const time = Math.ceil(words / wordsPerMinute);

	return time;
}
