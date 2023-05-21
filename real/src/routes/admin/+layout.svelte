<script lang="ts">
	import { page } from '$app/stores';
	import { derived } from 'svelte/store';
	import { AppShell, AppBar, AppRail, AppRailTile } from '@skeletonlabs/skeleton';

	import ArrowLeftIcon from '$components/@icons/ArrowLeftIcon.svelte';
	import SearchIcon from '$components/@icons/SearchIcon.svelte';

	const selected = derived(page, ($page) => $page.url.pathname);
</script>

<AppShell>
	<svelte:fragment slot="header">
		<AppBar>
			<svelte:fragment slot="lead">
				<a href="/">
					<ArrowLeftIcon />
				</a>
			</svelte:fragment>
			관리자 페이지 - {$page.data.user?.profile?.nickname}
		</AppBar>
	</svelte:fragment>

	<svelte:fragment slot="sidebarLeft">
		<AppRail {selected} background="bg-surface-300-600-token">
			<AppRailTile label="Search" href="/admin"><SearchIcon /></AppRailTile>
			<AppRailTile label="About" href="/about">(icon)</AppRailTile>
			<AppRailTile label="Login" href="/login">(icon)</AppRailTile>
		</AppRail>
	</svelte:fragment>

	<main class="max-w-[1200px] mx-auto py-20">
		<slot />
	</main>
</AppShell>
