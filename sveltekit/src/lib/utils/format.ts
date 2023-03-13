export function formatDate(dateData: Date) {
	const year = dateData.getFullYear();
	const month = dateData.getMonth() + 1;
	const date = dateData.getDate();

	return `${year}. ${month >= 10 ? month : `0${month}`}. ${date >= 10 ? date : `0${date}`}.`;
}

export function formatTagToSlug(tag: string) {
	return tag.replace(' ', '-').toLowerCase();
}

export function formatCount(count: number) {
	return count >= 1000 ? `${count / 1000}.${String(count % 1000).charAt}` : `${count}`;
}
