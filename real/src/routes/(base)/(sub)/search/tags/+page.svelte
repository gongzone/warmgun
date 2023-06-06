<script lang="ts">
	import { page } from '$app/stores';
	import { browser } from '$app/environment';
	import { createInfiniteQuery } from '@tanstack/svelte-query';

	import type { Tag } from '$lib/types/tag';
	import { search } from '$lib/client-fetch/search';

	import NoSearchResults from '../_NoSearchResults/NoSearchResults.svelte';
	import SearchTotal from '../_SearchTotal/SearchTotal.svelte';
	import InfiniteScroll from '$components/@utils/InfiniteScroll.svelte';

	$: q = $page.url.searchParams.get('q');

	$: searchTagsQuery = createInfiniteQuery({
		queryKey: ['search', 'tags', q],
		queryFn: () =>
			search<Tag[]>(q, {
				mode: 'tags',
				take: 30,
				cursor: 0
			}),
		getNextPageParam: (lastPage) => lastPage.nextCursor,
		keepPreviousData: true,
		enabled: browser && !!q
	});
</script>

{#if $searchTagsQuery.isSuccess && $searchTagsQuery.data.pages[0].totalHits > 0}
	<div>
		<SearchTotal totalHits={$searchTagsQuery.data.pages[0].totalHits} />
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
	</div>
{:else}
	<NoSearchResults />
{/if}
