<script lang="ts">
	import type { LayoutData } from '../$types';
	import { AppBar } from '@skeletonlabs/skeleton';

	import MainLogo from '$components/@svg/MainLogo.svelte';
	import NoLoggedInMenu from '$components/Menu/NoLoggedInMenu.svelte';
	import AvatarMenu from '$components/Menu/AvatarMenu.svelte';

	export let user: LayoutData['user'];
</script>

<AppBar
	background="bg-surface-800"
	border="border-b border-surface-500"
	padding="px-4 md:px-8 py-2"
>
	<svelte:fragment slot="lead">
		<a href="/">
			<MainLogo />
		</a>
	</svelte:fragment>

	<input type="search" class="max-w-[200px]" placeholder="검색어를 입력하세요." />

	<svelte:fragment slot="trail">
		{#if !user}
			<NoLoggedInMenu />
		{:else}
			<AvatarMenu {user} />
		{/if}</svelte:fragment
	>
</AppBar>
