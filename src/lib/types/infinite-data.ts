export interface InfiniteData<T> {
	data: T[];
	nextCursor: number | undefined;
}
