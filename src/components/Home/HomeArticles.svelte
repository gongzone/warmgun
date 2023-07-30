<script lang="ts">
	import NoDataCard from '$components/@ui/NoDataCard.svelte';
	import Article from '$components/Article/Article/Article.svelte';
	import type { Article as ArticleData } from '$lib/types/article';

	export let articles: ArticleData[];
</script>

<ul class="grid grid-cols-3 gap-7">
	{#if articles.length > 0}
		{#each articles as article, index (article.id)}
			<li class="pb-4">
				<Article {article} />
			</li>
		{/each}
	{:else}
		<NoDataCard />
	{/if}
</ul>
