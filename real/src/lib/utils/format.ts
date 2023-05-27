import dayjs from 'dayjs';

export function formatDate(date: Date) {
	return dayjs(date).format('YYYY. MM. DD');
}

export function tagToSlug(tag: string) {
	return tag.trim().replace(' ', '-').toLowerCase();
}
