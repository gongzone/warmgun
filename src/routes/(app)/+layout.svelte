<script lang="ts">
	import type { LayoutData } from './$types';
	import { page } from '$app/stores';

	import bgSnow from '$lib/images/bg-snow.svg';

	import Header from './_Header/Header.svelte';
	import Hero from './_Hero/Hero.svelte';
	import Footer from './_Footer/Footer.svelte';

	export let data: LayoutData;
</script>

{#if $page.url.pathname === '/'}
	<div class="relative bg-surface-800">
		<img
			src={bgSnow}
			alt="bg-snow"
			class="absolute top-0 left-0 w-screen h-full opacity-[0.03] object-cover"
		/>
		<Header user={data.user} />
		<Hero />
	</div>
{:else}
	<Header user={data.user} />
{/if}

<main class="px-[5vw] md:py-14">
	<slot />
</main>

<Footer />
