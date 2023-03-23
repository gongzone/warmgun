<script lang="ts">
	import { page } from '$app/stores';

	import bgSnow from '$lib/images/bg-snow.svg';
	import AppHeader from '$components/Header/AppHeader.svelte';
	import HomeHero from '$components/Hero/HomeHero/HomeHero.svelte';
</script>

{#if $page.url.pathname === '/'}
	<div class="relative bg-surface-800">
		<img
			src={bgSnow}
			alt="bg-snow"
			class="absolute top-0 left-0 w-screen h-full opacity-[0.03] object-cover"
		/>
		<AppHeader />
		<HomeHero />
	</div>
{:else}
	<AppHeader />
{/if}

<slot />
