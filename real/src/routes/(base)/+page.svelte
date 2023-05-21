<script lang="ts">
	import type { PageData } from './$types';

	import FireIcon from '$components/@icons/FireIcon.svelte';
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
			<TextWithIcon icon={FireIcon} class="opacity-75">요즘 뜨는 아티클들을 만나보세요</TextWithIcon
			>
		</div>

		<ArticleGrid items={trendingArticles} let:item>
			<ArticleItem article={item} />
		</ArticleGrid>
	</section>
</div>
