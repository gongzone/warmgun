<script lang="ts">
	import type { LayoutData } from './$types';
	import { page } from '$app/stores';
	import { AppShell } from '@skeletonlabs/skeleton';

	import bgSnow from '$lib/images/bg-snow.svg';

	import AppHeader from '$components/Header/AppHeader/AppHeader.svelte';
	import HomeHero from '$components/Hero/HomeHero/HomeHero.svelte';
	import Footer from '$components/Footer/Footer.svelte';

	export let data: LayoutData;
</script>

<AppShell>
	<svelte:fragment slot="pageHeader">
		{#if $page.url.pathname === '/'}
			<div class="relative bg-surface-800">
				<img
					src={bgSnow}
					alt="bg-snow"
					class="absolute top-0 left-0 w-screen h-full opacity-[0.03] object-cover"
				/>
				<AppHeader user={data.user} />
				<HomeHero />
			</div>
		{:else}
			<AppHeader user={data.user} border="border-b border-b-surface-500" />
		{/if}
	</svelte:fragment>

	<main>
		<slot />
	</main>

	<svelte:fragment slot="pageFooter">
		<Footer />
	</svelte:fragment>
</AppShell>
