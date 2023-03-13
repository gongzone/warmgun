<script lang="ts">
	import { AppBar } from '@skeletonlabs/skeleton';

	import type { AuthenticatedUser } from '$lib/types/user';

	import AuthenticatedMenu from '$components/Popover/Menu/AuthenticatedMenu/AuthenticatedMenu.svelte';
	import AnonymousMenu from '$components/Popover/Menu/AnonymousMenu/AnonymousMenu.svelte';
	import Hamburger from './Hamburger/Hamburger.svelte';
	import SiteLogo from './SiteLogo/SiteLogo.svelte';

	export let user: AuthenticatedUser;
	export let border: string = '';
</script>

<AppBar
	class="relative"
	slotLead="space-x-1 md:space-x-4"
	background="bg-transparent"
	shadow="shadow-none"
	{border}
	padding="px-[5vw] py-5 sm:py-6 md:py-12"
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
