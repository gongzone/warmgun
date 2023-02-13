<script lang="ts">
	import type { LayoutData } from './$types';

	import snow from '$lib/images/Snow.svg';

	import Header from './_Header/Header.svelte';
	import Hero from './_Hero/Hero.svelte';
	import Footer from '../_Footer/Footer.svelte';

	export let data: LayoutData;
</script>

<div class="relative bg-surface-800">
	<img
		src={snow}
		alt="snow"
		class="absolute opacity-[0.03] top-0 left-0 w-screen h-full object-cover"
	/>
	<Header user={data.user} />
	<Hero />
</div>

<main class="px-[5vw] md:py-14">
	<slot />
</main>

<Footer />
