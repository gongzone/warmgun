export async function search<T>(
	q: string | null,
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
	const { data, nextCursor } = await fetch(
		`/api/search?q=${q}&mode=${mode}&take=${take}&cursor=${cursor}`,
		{
			method: 'GET',
			headers: { 'Content-Type': 'application/json' }
		}
	).then((res) => res.json());

	return { data: data as T, nextCursor };
}
