<script lang="ts">
	import NoDataCard from '$components/@ui/NoDataCard.svelte';
	import ArticleCard from '$components/@item/Article/ArticleCard.svelte';
	import type { Article } from '$lib/types/article';

	export let articles: Article[];
</script>

<ul class="grid gap-7 grid-cols-1 min-[580px]:grid-cols-2 xl:grid-cols-3">
	{#if articles.length > 0}
		{#each articles as article, index (article.id)}
			<li>
				<ArticleCard {article} />
			</li>
		{/each}
	{:else}
		<NoDataCard />
	{/if}
</ul>
