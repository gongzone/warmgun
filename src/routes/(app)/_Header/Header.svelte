<script lang="ts">
	import type { LayoutData } from '../$types';
	import { AppBar } from '@skeletonlabs/skeleton';

	import Logo from './Logo/Logo.svelte';
	import NavigationButton from './NavigationButton/NavigationButton.svelte';
	import NoLoggedInMenu from '$components/Menu/NoLoggedInMenu.svelte';
	import AvatarMenu from '$components/Menu/AvatarMenu.svelte';

	export let user: LayoutData['user'];
</script>

<AppBar
	class="relative"
	slotLead="space-x-1 md:space-x-4"
	background="bg-transparent"
	shadow="shadow-none"
	padding="px-[5vw] py-5 md:py-12"
>
	<svelte:fragment slot="lead">
		<NavigationButton />
		<a href="/">
			<Logo />
		</a>
	</svelte:fragment>

	<svelte:fragment slot="trail">
		{#if !user}
			<NoLoggedInMenu />
		{:else}
			<AvatarMenu {user} />
		{/if}
	</svelte:fragment>
</AppBar>
