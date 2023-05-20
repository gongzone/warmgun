<script lang="ts">
	import type { PageData } from './$types';
	import HomeHero from '$lib/components/Hero/HomeHero/HomeHero.svelte';

	export let data: PageData;

	$: ({ topUsers, popularTags } = data);
</script>

<div class="container">
	<section class="py-16 md:py-20">
		<HomeHero {topUsers} {popularTags} />
	</section>
</div>
