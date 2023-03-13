<script lang="ts">
	import type { LayoutData } from '../../../routes/[slug=blog]/$types';
	import { AppBar } from '@skeletonlabs/skeleton';

	import logoGun from '$lib/images/logo-gun.svg';

	import AuthenticatedMenu from '$components/Popover/Menu/AuthenticatedMenu/AuthenticatedMenu.svelte';
	import AnonymousMenu from '$components/Popover/Menu/AnonymousMenu/AnonymousMenu.svelte';
	import SearchInput from '$components/Form/SearchInput.svelte';

	export let user: LayoutData['user'];
</script>

<AppBar
	background="bg-transparent"
	border="border-b border-surface-500"
	padding="px-4 md:px-8 py-2"
>
	<svelte:fragment slot="lead">
		<a href="/">
			<img src={logoGun} alt="logo-gun" class="w-[42px] md:w-[58px]" />
		</a>
	</svelte:fragment>

	<SearchInput width="w-[280px]" />

	<svelte:fragment slot="trail">
		{#if !user}
			<AnonymousMenu />
		{:else}
			<AuthenticatedMenu {user} />
		{/if}</svelte:fragment
	>
</AppBar>
