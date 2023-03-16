export function formatDate(dateData: Date) {
	const year = dateData.getFullYear();
	const month = dateData.getMonth() + 1;
	const date = dateData.getDate();

	return `${year}. ${month >= 10 ? month : `0${month}`}. ${date >= 10 ? date : `0${date}`}.`;
}
