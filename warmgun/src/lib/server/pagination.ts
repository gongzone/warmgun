export function buildPaginationData<T>(data: T[], take: number, cursor: number) {
	return {
		data,
		nextCursor: data.length === take ? cursor + 1 : undefined
	};
}
