<script lang="ts">
	import Communities from './Communities/Communities.svelte';
	import HeroWords from './HeroWords/HeroWords.svelte';
	import HeroSearch from './HeroSearch/HeroSearch.svelte';
	import PopularTags from './PopularTags/PopularTags.svelte';
</script>

<div class="relative flex flex-col items-center px-4 pb-12">
	<Communities />

	<div class="mt-6 mb-8">
		<HeroWords />
	</div>

	<div class="space-y-8">
		<HeroSearch />
		<div class="flex flex-col items-center gap-4">
			<span class="text-sm md:text-base font-bold">Popular Tags</span>
			<PopularTags />
		</div>
	</div>
</div>
