export async function search<T>(
	q: string | null | undefined,
	{
		mode,
		take,
		cursor
	}: {
		mode: 'articles' | 'tags' | 'users';
		take: number;
		cursor: number;
	}
) {
	const { data, nextCursor, totalHits } = await fetch(
		`/api/search?q=${q}&mode=${mode}&take=${take}&cursor=${cursor}`,
		{
			method: 'GET',
			headers: { 'Content-Type': 'application/json' }
		}
	).then((res) => res.json());

	return {
		data: data as T,
		nextCursor: nextCursor as number | undefined,
		totalHits: totalHits as number
	};
}
