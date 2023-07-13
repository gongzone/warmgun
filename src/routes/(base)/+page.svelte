<script lang="ts">
	import type { PageData } from './$types';

	import Seo from '$components/@utils/Seo.svelte';
	import Button from '$components/@ui/Test/Button.svelte';
	import PageContainer from '$components/@ui/Test/PageContainer.svelte';
	import HomeHero from '$components/HomeHero/HomeHero.svelte';
	import HomeTrendingArticles from './_HomeTrendingArticles/HomeTrendingArticles.svelte';
	import HomeMoreInfo from './_HomeMoreInfo/HomeMoreInfo.svelte';
	import { categories } from '$lib/constants/categories';
	import ArticleIcon from '$components/@icons/ArticleIcon.svelte';
	import ArrowRightIcon from '$components/@icons/ArrowRightIcon.svelte';
	import ArrowRightSmall from '$components/@icons/ArrowRightSmall.svelte';
	import GenreIcon from '$components/@icons/GenreIcon.svelte';
	import SearchIcon from '$components/@icons/SearchIcon.svelte';
	import FeedIcon from '$components/@icons/FeedIcon.svelte';

	export let data: PageData;

	$: ({ topUsers, popularTags, trendingArticles } = data);
</script>

<Seo />

<div class="">
	<section class="">
		<div class="container py-16 border-b">
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
					<PartTwo.HeroGradient />
					<PartTwo.TrendingArticlesShowcase articles={trendingArticles} />
				</div>
			</HomeHero>
		</div>
	</section>

	<section class=" py-16">
		<div class="container grid grid-cols-12 gap-8">
			<div class="col-span-9 shadow-2xl bg-[#151515] rounded-lg border">contents</div>

			<div class="col-span-3 space-y-6">
				<div class="border rounded-lg p-4 space-y-2 shadow-2xl bg-[#151515]">
					<span class="font-semibold block">인기 태그</span>
					<div class="flex flex-wrap gap-2">
						{#each popularTags as tag (tag.id)}
							<Button variant="outline" size="sm">{tag.name}</Button>
						{/each}
					</div>
				</div>

				<div class="border rounded-lg p-4 space-y-2 shadow-2xl bg-[#151515]">
					<span class="font-semibold block">카테고리</span>
					<div class="flex flex-wrap gap-2">
						{#each categories as category (category.title)}
							<Button variant="outline" size="sm" class="rounded-md">{category.title}</Button>
						{/each}
					</div>
				</div>

				<div class="border rounded-lg p-4 space-y-2 shadow-2xl bg-[#151515]">
					<span class="font-semibold block">See More</span>
					<ul class="">
						<li
							class="flex flex-nowrap items-center px-3 py-2 gap-3 rounded-full hover:bg-accent hover:text-accent-foreground cursor-pointer transition-colors duration-200 ease-in-out"
						>
							<span><ArticleIcon /></span>
							<span>아티클 페이지</span>
							<span><ArrowRightSmall /></span>
						</li>
						<li
							class="flex flex-nowrap items-center px-3 py-2 gap-3 rounded-full hover:bg-accent hover:text-accent-foreground cursor-pointer transition-colors duration-200 ease-in-out"
						>
							<span><GenreIcon /></span>
							<span>커뮤니티</span>
							<span><ArrowRightSmall /></span>
						</li>
						<li
							class="flex flex-nowrap items-center px-3 py-2 gap-3 rounded-full hover:bg-accent hover:text-accent-foreground cursor-pointer transition-colors duration-200 ease-in-out"
						>
							<span><SearchIcon /></span>
							<span>검색</span>
							<span><ArrowRightSmall /></span>
						</li>
						<li
							class="flex flex-nowrap items-center px-3 py-2 gap-3 rounded-full hover:bg-accent hover:text-accent-foreground cursor-pointer transition-colors duration-200 ease-in-out"
						>
							<span><FeedIcon /></span>
							<span>나의 피드</span>
							<span><ArrowRightSmall /></span>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</section>

	<section>
		<HomeMoreInfo />
	</section>
</div>
