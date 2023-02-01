<script lang="ts">
	import type { LayoutData } from '../$types';
	import { AppBar } from '@skeletonlabs/skeleton';

	import { openNavigation } from '../../_GlobalDrawer/drawer';

	import Gun from '$components/@svg/gun.svelte';
	import NoLoggedInMenu from '$components/Menu/NoLoggedInMenu.svelte';
	import AvatarMenu from '$components/Menu/AvatarMenu.svelte';

	export let user: LayoutData['user'];
</script>

<AppBar
	slotLead="space-x-1 md:space-x-4"
	background="bg-transparent"
	shadow="shadow-none"
	padding="px-[5vw] py-9 md:py-12"
>
	<svelte:fragment slot="lead">
		<button class="btn-icon variant-ringed-tertiary w-12 ring-[1.5px]" on:click={openNavigation}>
			<i class="ri-menu-2-line ri-lg" />
		</button>
		<a href="/">
			<div class="flex items-center gap-1 md:gap-2">
				<Gun />
				<div>
					<h2 class="unstyled !font-logo text-2xl md:text-4xl">Warmgun</h2>
					<span class="hidden md:block">개발 커뮤니티 & 블로그 서비스</span>
				</div>
			</div>
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
