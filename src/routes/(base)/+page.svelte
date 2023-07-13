<script lang="ts">
	import type { PageData } from './$types';

	import Seo from '$components/@utils/Seo.svelte';
	import Button from '$components/@ui/Test/Button.svelte';
	import PageContainer from '$components/@ui/Test/PageContainer.svelte';
	import HomeHero from '$components/HomeHero/HomeHero.svelte';
	import HomeTrendingArticles from './_HomeTrendingArticles/HomeTrendingArticles.svelte';
	import HomeMoreInfo from './_HomeMoreInfo/HomeMoreInfo.svelte';

	export let data: PageData;

	$: ({ topUsers, popularTags, trendingArticles } = data);
</script>

<Seo />

<PageContainer class="space-y-28 md:space-y-40">
	<section>
		<HomeHero
			class="grid grid-cols-1 gap-8 items-center md:gap-10 lg:grid-cols-2"
			let:PartOne
			let:PartTwo
		>
			<div class="relative z-30 space-y-4 mx-auto md:space-y-6 lg:mx-0">
				<PartOne.MainWords firstWord="당신의 개발 이야기" secondWord="기록하고 공유하세요" />
				<PartOne.SubWords firstWord="Bring, Discover, Share" secondWord="Ideas & Stories" />
			</div>

			<div class="relative w-full h-full max-w-[640px] mx-auto">
				<PartTwo.TrendingArticlesShowcase articles={trendingArticles} />
			</div>
		</HomeHero>
	</section>

	<section>
		<HomeTrendingArticles {trendingArticles} />
	</section>

	<section>
		<HomeMoreInfo />
	</section>
</PageContainer>
