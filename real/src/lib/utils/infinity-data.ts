export function buildInfinityData<T>(data: T[], take: number, cursor: number) {
	return {
		data,
		nextCursor: data.length === take ? cursor + 1 : undefined
	};
}
