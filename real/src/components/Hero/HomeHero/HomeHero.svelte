<script lang="ts">
	import type { BlogUser } from '$lib/types/user';

	import TagIcon from '$components/@icons/TagIcon.svelte';
	import Carousel from '$components/@ui/Carousel.svelte';
	import TextWithIcon from '$components/@ui/TextWithIcon.svelte';
	import HeroLogo from './HeroLogo/HeroLogo.svelte';
	import MainWords from './MainWords/MainWords.svelte';
	import SubWords from './SubWords/SubWords.svelte';
	import HeroGradient from './HeroGradient/HeroGradient.svelte';
	import TopBlogerBadge from './TopBlogerBadge/TopBlogerBadge.svelte';
	import TopBlogerCard from './TopBlogerCard/TopBlogerCard.svelte';

	export let topUsers: BlogUser[];
	export let popularTags: string[];
</script>

<div class="grid grid-cols-1 gap-8 items-center md:gap-10 lg:grid-cols-2">
	<section class="space-y-4 mx-auto md:space-y-6 lg:mx-0">
		<HeroLogo />
		<MainWords />
		<SubWords />
	</section>

	<section class="relative max-w-[640px] mx-auto">
		<HeroGradient />
		<TopBlogerBadge />
		<Carousel items={topUsers} bottomClass="lg:absolute" let:item>
			<TopBlogerCard topBloger={item} />
		</Carousel>
	</section>

	<div class="space-y-3">
		<TextWithIcon icon={TagIcon} size="lg">인기태그</TextWithIcon>

		<ul class="flex flex-wrap gap-2">
			{#each popularTags as tag (tag)}
				<li>
					<a href="/" class="btn variant-ringed-tertiary text-sm">{tag}</a>
				</li>
			{/each}
		</ul>
	</div>
</div>
