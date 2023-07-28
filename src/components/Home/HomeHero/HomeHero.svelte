<script lang="ts">
	import type { Article } from '$lib/types/article';

	import MainWords from './_MainWords.svelte';
	import SubWords from './_SubWords.svelte';
	import HeroGradient from './_HeroGradient.svelte';
	import ArticleShowcase from './_ArticleShowcase.svelte';
	import NoDataCard from '$components/@ui/NoDataCard.svelte';

	export let articles: Article[];
</script>

<div class="grid grid-cols-1 gap-8 items-center md:gap-10 lg:grid-cols-2">
	<div class="relative z-20 space-y-4 mx-auto md:space-y-6 lg:mx-0">
		<MainWords />
		<SubWords />
	</div>

	<div class="relative w-full h-full max-w-[640px] mx-auto">
		<HeroGradient />
		{#if articles.length > 0}
			<ArticleShowcase {articles} />
		{:else}
			<NoDataCard />
		{/if}
	</div>
</div>
