<script lang="ts">
	import type { BlogUser } from '$lib/types/user';
	import type { Tag } from '$lib/types/tag';
	import { cn } from '$lib/utils/cn';

	let className: string | undefined = undefined;

	export { className as class };

	import TagIcon from '$components/@icons/TagIcon.svelte';
	import Carousel from '$components/@ui/Carousel.svelte';
	import TextWithIcon from '$components/@ui/TextWithIcon.svelte';
	import NoDataCard from '$components/@ui/NoDataCard.svelte';
	import TopBlogerCard from '$components/User/TopBlogerCard/TopBlogerCard.svelte';
	import MainWords from './MainWords.svelte';
	import SubWords from './SubWords.svelte';
	import TrendingArticlesShowcase from './TrendingArticlesShowcase.svelte';

	// export let topUsers: BlogUser[];
	// export let popularTags: Tag[];

	const PartOne = {
		MainWords,
		SubWords
	};

	const PartTwo = {
		TrendingArticlesShowcase
	};
</script>

<div class={cn(className)}>
	<slot {PartOne} {PartTwo} />

	<!-- <section class="relative w-full h-full max-w-[640px] mx-auto">
		<HeroGradient />
		{#if topUsers.length > 0}
			<Carousel items={topUsers} bottomClass="lg:absolute" let:item>
				<TopBlogerCard topBloger={item} />
			</Carousel>
		{:else}
			<NoDataCard text="유저 데이터가 존재하지 않습니다!" />
		{/if}
	</section>

	<section class="space-y-3">
		<TextWithIcon icon={TagIcon} size="lg">인기태그</TextWithIcon>
		{#if popularTags.length > 0}
			<PopularTags {popularTags} />
		{:else}
			<NoDataCard text="태그 데이터가 존재하지 않습니다!" />
		{/if}
	</section> -->
</div>
