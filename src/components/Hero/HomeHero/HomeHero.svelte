<script lang="ts">
	import HeroCommunities from './HeroCommunities/HeroCommunities.svelte';
	import HeroPopularTags from './HeroPopularTags/HeroPopularTags.svelte';
</script>

<div class="relative flex flex-col items-center px-4 pb-12">
	<HeroCommunities />

	<div class="flex flex-col gap-1 justify-center items-center mt-6 mb-8">
		<span class="font-bold font-serif text-2xl ">당신의 개발 이야기</span>
		<span class="font-serif">기록하고 공유하세요</span>
	</div>

	<div class="flex flex-col items-center">
		<div class="w-full">
			<input type="search" placeholder="검색어를 입력하세요" class="h-14" />
		</div>

		<span class="mt-8 mb-4 text-sm md:text-base">Popular Tags</span>

		<HeroPopularTags />
	</div>
</div>
