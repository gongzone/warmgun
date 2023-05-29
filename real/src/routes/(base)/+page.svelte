<script lang="ts">
	import type { PageData } from './$types';

	/* Home Frames */
	import HomeHero from './_HomeHero/HomeHero.svelte';
	import HomeTrendingArticles from './_HomeTrendingArticles/HomeTrendingArticles.svelte';
	import HomeMoreInfo from './_HomeMoreInfo/HomeMoreInfo.svelte';

	export let data: PageData;

	$: ({ topUsers, popularTags, trendingArticles } = data);
</script>

<div class="container py-12 space-y-28 md:py-20 md:space-y-40">
	<section>
		<HomeHero {topUsers} {popularTags} />
	</section>

	<section>
		<HomeTrendingArticles {trendingArticles} />
	</section>

	<section>
		<HomeMoreInfo />
	</section>
</div>
