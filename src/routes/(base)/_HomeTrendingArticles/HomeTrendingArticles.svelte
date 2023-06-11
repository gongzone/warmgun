<script lang="ts">
	import type { Article } from '$lib/types/article';

	import FireIcon from '$components/@icons/FireIcon.svelte';
	import TextSection from '$components/@ui/TextSection.svelte';
	import ArticleItem from '$components/Article/ArticleItem/ArticleItem.svelte';
	import NoDataCard from '$components/@ui/NoDataCard.svelte';

	export let trendingArticles: Article[];
</script>

<div class="space-y-12">
	<TextSection
		title="Trending Articles"
		subTitle="요즘 뜨는 아티클들을 만나보세요"
		icon={FireIcon}
	/>

	{#if trendingArticles.length > 0}
		<ul class="article-grid">
			{#each trendingArticles as article (article.id)}
				<li><ArticleItem {article} /></li>
			{/each}
		</ul>
	{:else}
		<NoDataCard text="아티클 데이터가 존재하지 않습니다!" />
	{/if}
</div>
