<script lang="ts">
	import type { LayoutData } from '../../../routes/(app)/$types';

	import HeroCommunities from './HeroCommunities/HeroCommunities.svelte';
	import HeroSearch from './HeroSearch/HeroSearch.svelte';
	import HeroPopularTags from './HeroPopularTags/HeroPopularTags.svelte';

	export let popularTags: LayoutData['popularTags'];
</script>

<div class="relative flex flex-col items-center px-4 pb-12">
	<HeroCommunities />

	<div class="flex flex-col items-center gap-1 mt-6 mb-8">
		<span class="font-bold font-serif text-2xl">당신의 개발 이야기</span>
		<span class="font-serif">기록하고 공유하세요</span>
	</div>

	<div>
		<HeroSearch />
		<div class="flex flex-col items-center gap-4 mt-8">
			<span class="text-sm md:text-base font-bold">Popular Tags</span>
			<HeroPopularTags tags={popularTags} />
		</div>
	</div>
</div>
