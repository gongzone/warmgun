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
	import Avatar from '$components/@ui/Test/Avatar.svelte';
	import Article from '$components/Article/Article/Article.svelte';

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

	<div class="container grid grid-cols-12 gap-12 py-10 relative">
		<div class="col-span-9 flex flex-col gap-16">
			<section class="">
				<div class="space-y-8">
					<div>
						<h3 class="text-4xl font-heading font-bold">커뮤니티</h3>
						<p>요즘 뜨는 아티클들을 만나보세요</p>
					</div>
					<div class="col-span-9 grid grid-cols-2 gap-8">
						<div>
							<span class="font-semibold block text-lg">질문</span>
							<ul>
								{#each Array.from({ length: 5 }) as question, index (index)}
									<li class="py-4 space-y-2">
										<div class="flex items-center gap-2">
											<Avatar src="https://github.com/shadcn.png" width="w-6" />
											<span class="text-sm">shadcn</span>
										</div>

										<div>
											<h1 class="font-bold line-clamp-1">
												개발자가 사랑하는 프론트엔드 프레임워크1 스벨트[Svelte]의 특징
											</h1>
										</div>
									</li>
									<hr />
								{/each}
							</ul>
						</div>

						<div>
							<span class="font-semibold block text-lg">자유게시판</span>
							<ul>
								{#each Array.from({ length: 5 }) as question, index (index)}
									<li class="py-4 space-y-2">
										<div class="flex items-center gap-2">
											<Avatar
												src="https://images.unsplash.com/photo-1502768040783-423da5fd5fa0?ixid=M3w0Njc5ODF8MHwxfGFsbHx8fHx8fHx8fDE2ODc5NzY4ODd8&ixlib=rb-4.0.3&w=200&h=200&auto=format&fit=crop"
												width="w-6"
											/>
											<span class="text-sm">라일라</span>
										</div>

										<div>
											<h1 class="font-bold line-clamp-1">
												OP.GG, 서비스 내 '인디게임 실시간 체험판 플레이' 선보였다
											</h1>
										</div>
									</li>
									<hr />
								{/each}
							</ul>
						</div>
					</div>
				</div>
			</section>

			<section>
				<div class="space-y-8">
					<div>
						<h3 class="text-4xl font-heading font-bold">트렌딩 아티클</h3>
						<p>요즘 뜨는 아티클들을 만나보세요</p>
					</div>
					<ul class="grid grid-cols-3 gap-7">
						{#each trendingArticles as article, index (article.id)}
							{#if index <= 8}
								<li class="pb-4">
									<Article {article} />
								</li>
							{/if}
						{/each}
					</ul>
				</div>
			</section>

			<section>
				<div class="space-y-8">
					<div>
						<h3 class="text-4xl font-heading font-bold">최신 아티클</h3>
						<p>요즘 뜨는 아티클들을 만나보세요</p>
					</div>
					<ul class="grid grid-cols-3 gap-7">
						{#each trendingArticles as article, index (article.id)}
							{#if index <= 8}
								<li class="pb-4">
									<Article {article} />
								</li>
							{/if}
						{/each}
					</ul>
				</div>
			</section>

			<section>
				<div class="space-y-8">
					<div>
						<h3 class="text-4xl font-heading font-bold">베스트 아티클</h3>
						<p>요즘 뜨는 아티클들을 만나보세요</p>
					</div>
					<ul class="grid grid-cols-3 gap-7">
						{#each trendingArticles as article, index (article.id)}
							{#if index <= 8}
								<li class="pb-4">
									<Article {article} />
								</li>
							{/if}
						{/each}
					</ul>
				</div>
			</section>
		</div>

		<aside class="space-y-6 col-span-3 h-full">
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
		</aside>
	</div>
</div>
