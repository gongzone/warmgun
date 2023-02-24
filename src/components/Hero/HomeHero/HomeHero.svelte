<script lang="ts">
	import SearchInput from '$components/Form/SearchInput.svelte';
	import HeroCommunities from './HeroCommunities/HeroCommunities.svelte';
	import HeroPopularTags from './HeroPopularTags/HeroPopularTags.svelte';
</script>

<div class="relative flex flex-col items-center px-4 pb-12">
	<HeroCommunities />

	<div class="flex flex-col gap-1 justify-center items-center mt-6 mb-8">
		<span class="font-bold font-serif text-2xl ">당신의 개발 이야기</span>
		<span class="font-serif">기록하고 공유하세요</span>
	</div>

	<div>
		<SearchInput height="h-14" />

		<div class="flex flex-col items-center mt-8 gap-4">
			<span class="text-sm md:text-base">Popular Tags</span>
			<HeroPopularTags />
		</div>
	</div>
</div>
