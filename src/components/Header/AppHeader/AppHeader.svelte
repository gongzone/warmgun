<script lang="ts">
	import type { LayoutData } from '../../../routes/(app)/$types';
	import { AppBar } from '@skeletonlabs/skeleton';

	import Hamburger from './Hamburger/Hamburger.svelte';
	import SiteLogo from './SiteLogo/SiteLogo.svelte';
	import AnonymousMenu from '$components/Header/@Menu/AnonymousMenu.svelte';
	import AuthenticatedMenu from '$components/Header/@Menu/AuthenticatedMenu.svelte';

	export let user: LayoutData['user'];
	export let border: string = '';
</script>

<AppBar
	class="relative"
	slotLead="space-x-1 md:space-x-4"
	background="bg-transparent"
	shadow="shadow-none"
	{border}
	padding="px-[5vw] py-5 md:py-12"
>
	<svelte:fragment slot="lead">
		<Hamburger />
	</svelte:fragment>

	<SiteLogo />

	<svelte:fragment slot="trail">
		{#if !user}
			<AnonymousMenu />
		{:else}
			<AuthenticatedMenu {user} />
		{/if}
	</svelte:fragment>
</AppBar>
