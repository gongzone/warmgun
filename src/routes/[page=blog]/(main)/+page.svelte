<script lang="ts">
	import type { PageData } from './$types';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { createInfiniteQuery } from '@tanstack/svelte-query';
	import { afterNavigate } from '$app/navigation';

	import { findBlogArticles } from '$lib/client-fetch/article';

	import ArticleItem from '$components/Article/ArticleItem/ArticleItem.svelte';
	import InfiniteScroll from '$components/@utils/InfiniteScroll.svelte';
	import type { Article } from '$lib/types/article';

	export let data: PageData;
	let articles: Article[] = [];

	$: {
		articles.push(...data.articles);
		articles = articles;
	}

	$: nextCursor = data.nextCursor;

	// afterNavigate(({ from, type, to }) => {
	// 	if (!from && type !== 'goto' && to) {
	// 		goto(to.url.pathname);
	// 	}
	// });
</script>

{#if articles.length > 0}
	<ul class="article-grid">
		{#each articles as article (article.id)}
			<li>
				<ArticleItem {article} displayUserInfo={false} />
			</li>
		{/each}
	</ul>

	<InfiniteScroll
		fetchFn={() =>
			goto(`?cursor=${nextCursor}`, {
				replaceState: true,
				noScroll: true
			})}
		hasNextPage={!!nextCursor}
	/>
	<div class="h-40" />
{:else}
	<div>
		<span>작성된 글이 없습니다.</span>
	</div>
{/if}
