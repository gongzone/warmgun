<script lang="ts">
	import type { PageData } from './$types';

	import programmingImage from '$lib/images/programming.svg';
	import { siteConfig } from '$lib/configs/site';

	import FireIcon from '$components/@icons/FireIcon.svelte';
	import GenreIcon from '$components/@icons/GenreIcon.svelte';
	import ArrowRightIcon from '$components/@icons/ArrowRightIcon.svelte';
	import ContrastIcon from '$components/@icons/ContrastIcon.svelte';
	import TextWithIcon from '$components/@ui/TextWithIcon.svelte';
	import HomeHero from '$components/Hero/HomeHero/HomeHero.svelte';
	import ArticleGrid from '$components/Article/ArticleGrid.svelte';
	import ArticleItem from '$components/Article/ArticleItem/ArticleItem.svelte';

	export let data: PageData;

	$: ({ topUsers, popularTags, trendingArticles } = data);
</script>

<div class="container py-12 md:py-20 space-y-32">
	<section>
		<HomeHero {topUsers} {popularTags} />
	</section>

	<section class="space-y-12">
		<div>
			<h3 class="font-heading-token text-4xl sm:text-5xl">Trending Articles</h3>
			<TextWithIcon icon={FireIcon} textClass="opacity-75"
				>요즘 뜨는 아티클들을 만나보세요</TextWithIcon
			>
		</div>

		<ArticleGrid items={trendingArticles} let:item>
			<ArticleItem article={item} />
		</ArticleGrid>
	</section>

	<section>
		<div>
			<h3 class="font-heading-token text-4xl sm:text-5xl">더 많은 글들이 당신을 기다립니다</h3>
			<TextWithIcon icon={ContrastIcon} textClass="opacity-75">
				지식과 영감을 얻고 유용하게 활용하세요</TextWithIcon
			>
		</div>

		<div class="grid grid-cols-1 gap-12 lg:grid-cols-2">
			<img src={programmingImage} class="max-w-[480px] lg:max-w-full mx-auto" alt="programming" />
			<div class="space-y-8">
				<div>
					<TextWithIcon
						icon={GenreIcon}
						size="3xl"
						class="!items-end"
						textClass="font-heading-token">Genre</TextWithIcon
					>
					<hr class="mt-3 mb-6 !border-surface-300" />
					<ul class="flex flex-wrap gap-3">
						{#each siteConfig.genre as genre (genre.title)}
							<li>
								<a
									href={genre.href}
									class="btn variant-filled border border-tertiary-500 hover:bg-surface-900 hover:text-surface-50"
									>{genre.title}</a
								>
							</li>
						{/each}
					</ul>
				</div>

				<div>
					<a href="/articles" class="btn variant-filled-primary rounded-md">
						<span class="text-sm">아티클 보러가기</span>
						<span><ArrowRightIcon class="w-4 h-4" /></span>
					</a>
				</div>
			</div>
		</div>
	</section>
</div>
