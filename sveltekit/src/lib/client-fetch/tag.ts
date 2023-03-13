export async function getTagsByInput(input: string, tags: string[]) {
	const { data: fetchedTags } = await fetch('/api/tag/search', {
		method: 'POST',
		body: JSON.stringify({ input, tags }),
		headers: { 'Content-Type': 'application/json' }
	}).then((res) => res.json());

	return fetchedTags;
}
