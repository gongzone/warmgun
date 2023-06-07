<script lang="ts">
	import type { BlogUser } from '$lib/types/user';
	import type { Tag } from '$lib/types/tag';

	import TagIcon from '$components/@icons/TagIcon.svelte';
	import Carousel from '$components/@ui/Carousel.svelte';
	import TextWithIcon from '$components/@ui/TextWithIcon.svelte';
	import NoDataCard from '$components/@ui/NoDataCard.svelte';
	import TopBlogerCard from '$components/User/TopBlogerCard/TopBlogerCard.svelte';
	import HeroLogo from './HeroLogo/HeroLogo.svelte';
	import MainWords from './MainWords/MainWords.svelte';
	import SubWords from './SubWords/SubWords.svelte';
	import HeroGradient from './HeroGradient/HeroGradient.svelte';
	import PopularTags from './PopularTags/PopularTags.svelte';

	export let topUsers: BlogUser[];
	export let popularTags: Tag[];
</script>

<div class="grid grid-cols-1 gap-8 items-center md:gap-10 lg:grid-cols-2">
	<section class="space-y-4 mx-auto md:space-y-6 lg:mx-0">
		<HeroLogo />
		<MainWords />
		<SubWords />
	</section>

	<section class="relative w-full h-full max-w-[640px] mx-auto">
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
	</section>
</div>
