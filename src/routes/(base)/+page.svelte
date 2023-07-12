<script lang="ts">
	import type { PageData } from './$types';

	import Seo from '$components/@utils/Seo.svelte';
	import Button from '$components/@ui/Test/Button.svelte';
	import HomeHero from './_HomeHero/HomeHero.svelte';
	import HomeTrendingArticles from './_HomeTrendingArticles/HomeTrendingArticles.svelte';
	import HomeMoreInfo from './_HomeMoreInfo/HomeMoreInfo.svelte';

	export let data: PageData;

	$: ({ topUsers, popularTags, trendingArticles } = data);
</script>

<Seo />

<div class="page-container space-y-28 md:space-y-40">
	<Button>sd</Button>
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
