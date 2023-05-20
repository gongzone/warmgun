<script lang="ts">
	import type { PageData } from './$types';
	import HomeHero from '$components/Hero/HomeHero/HomeHero.svelte';

	export let data: PageData;

	$: ({ topUsers, popularTags } = data);
</script>

<div class="container py-12 md:py-20">
	<section>
		<HomeHero {topUsers} {popularTags} />
	</section>
</div>
