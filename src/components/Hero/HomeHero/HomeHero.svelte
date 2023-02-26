<script lang="ts">
	import HeroCommunities from './HeroCommunities/HeroCommunities.svelte';
	import HeroSearch from './HeroSearch/HeroSearch.svelte';
	import HeroPopularTags from './HeroPopularTags/HeroPopularTags.svelte';

	const popularTags = [
		{ name: 'React', to: '/' },
		{ name: 'JavaScript', to: '/' },
		{ name: 'NextJs', to: '/' },
		{ name: 'Python', to: '/' },
		{ name: 'Web', to: '/' },
		{ name: 'Machine Learning', to: '/' },
		{ name: 'Sveltekit', to: '/' },
		{ name: '일상', to: '/' },
		{ name: '직장', to: '/' },
		{ name: 'My Story', to: '/' },
		{ name: 'Functional Programming', to: '/' },
		{ name: 'Algorithm', to: '/' }
	];
</script>

<div class="relative flex flex-col items-center px-4 pb-12">
	<HeroCommunities />

	<div class="flex flex-col gap-1 justify-center items-center mt-6 mb-8">
		<span class="font-bold font-serif text-2xl ">당신의 개발 이야기</span>
		<span class="font-serif">기록하고 공유하세요</span>
	</div>

	<div>
		<HeroSearch />

		<div class="flex flex-col items-center mt-8 gap-4">
			<span class="text-sm md:text-base">Popular Tags</span>
			<HeroPopularTags {popularTags} />
		</div>
	</div>
</div>
