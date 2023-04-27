<script lang="ts">
	import type { PageServerData } from './$types';

	import HomeHero from './HomeHero.svelte';

	export let data: PageServerData;

	$: ({ topUsers } = data);
</script>

<div>
	<section class="">
		<div class="section-container">
			<HomeHero {topUsers} />
		</div>
	</section>
</div>

<style lang="postcss">
	.section-container {
		@apply w-full max-w-7xl mx-auto p-[5vw] py-16 md:py-24;
	}

	.hero-gradient {
		background-image: radial-gradient(
				at 0% 0%,
				rgba(var(--color-secondary-500) / 0.11) 0px,
				transparent 50%
			),
			radial-gradient(at 98% 1%, rgba(var(--color-error-500) / 0.11) 0px, transparent 50%);
	}
</style>
