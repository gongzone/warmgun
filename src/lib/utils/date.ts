export function formatDate(dateData: Date) {
	const year = dateData.getFullYear();
	const month = dateData.getMonth() + 1;
	const date = dateData.getDate();

	return `${year}년 ${month}월 ${date}일`;
}
