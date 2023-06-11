<script lang="ts">
	import type { PageData } from './$types';
	import { createInfiniteQuery } from '@tanstack/svelte-query';

	import type { Tag } from '$lib/types/tag';
	import { api } from '$lib/api/api';

	import NoSearchResults from '../_NoSearchResults/NoSearchResults.svelte';
	import InfiniteScroll from '$components/@utils/InfiniteScroll.svelte';

	export let data: PageData;

	$: ({ q } = data);

	$: searchTagsQuery = createInfiniteQuery({
		queryKey: ['search', 'tags', q, 30],
		queryFn: api().search<Tag>,
		getNextPageParam: (lastPage) => lastPage.nextCursor,
		keepPreviousData: true,
		enabled: !!q
	});
</script>

{#if $searchTagsQuery.isSuccess && $searchTagsQuery.data.pages[0].data.length > 0}
	<ul class="flex flex-wrap gap-3">
		{#each $searchTagsQuery.data.pages as { data }}
			{#each data as tag (tag.id)}
				<li>
					<a href={`/tags/${tag.slug}`} class="btn variant-ringed-tertiary text-sm"
						>{tag.name} ({tag._count.articles})</a
					>
				</li>
			{/each}
		{/each}
	</ul>
	<InfiniteScroll
		fetchFn={$searchTagsQuery.fetchNextPage}
		hasNextPage={$searchTagsQuery.hasNextPage}
	/>
{:else}
	<NoSearchResults />
{/if}
