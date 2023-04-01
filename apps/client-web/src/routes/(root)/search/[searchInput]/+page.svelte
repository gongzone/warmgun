<script lang="ts">
	import { searchArtlces } from '$api/article';
	import { page } from '$app/stores';
	import { createInfiniteQuery } from '@tanstack/svelte-query';

	import ArticleList from '$components/Article/ArticleList/ArticleList.svelte';

	$: searchArticlesQuery = createInfiniteQuery({
		queryKey: ['searchArticles', 10, $page.params.searchInput],
		queryFn: searchArtlces,
		getNextPageParam: (lastPage) => lastPage.nextCursor
	});
</script>

{#if $searchArticlesQuery.isSuccess}
	<div class="grid grid-cols-[repeat(8,1fr)_repeat(4,_minmax(48px,_1fr))]">
		<section class="col-[1_/_span_7]">
			<ul>
				{#each $searchArticlesQuery.data.pages as { articles }}
					{#each articles as article}
						<li>
							<ArticleList {article} />
						</li>

						<hr class="my-6" />
					{/each}
				{/each}
			</ul>
		</section>
	</div>
{/if}
