<script lang="ts">
	import bgSnow from '$lib/images/bg-snow.svg';

	import ImageBackground from '$components/@ui/Block/ImageBackground.svelte';
	import Communities from './Communites/Communities.svelte';
	import HeroWords from './HeroWords/HeroWords.svelte';
	import SearchInput from '$components/@ui/Form/SearchInput.svelte';
	import PopularTags from './PopularTags/PopularTags.svelte';
</script>

<ImageBackground image={bgSnow} alt="bg-snow" bg="bg-surface-800">
	<div class="relative flex flex-col items-center px-4 pb-12">
		<Communities />

		<div class="mt-6 mb-8">
			<HeroWords />
		</div>

		<div class="space-y-8">
			<SearchInput size="lg" />
			<PopularTags />
		</div>
	</div>
</ImageBackground>
