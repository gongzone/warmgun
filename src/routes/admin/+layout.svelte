<script lang="ts">
	import { page } from '$app/stores';
	import { derived } from 'svelte/store';
	import { AppShell, AppBar, AppRail, AppRailTile, AppRailAnchor } from '@skeletonlabs/skeleton';

	import AdminHeader from '$components/Header/AdminHeader/AdminHeader.svelte';
	import AdminRail from '$components/Rail/AdminRail/AdminRail.svelte';
</script>

<AppShell>
	<svelte:fragment slot="header">
		<AdminHeader />
	</svelte:fragment>

	<svelte:fragment slot="sidebarLeft">
		<AdminRail />
	</svelte:fragment>

	<div class="p-20">
		<h2 class="text-4xl self-start border-b pb-4 mb-8">
			{#if $page.url.pathname === '/admin'}
				관리자 메인페이지
			{:else if $page.url.pathname === '/admin/search'}
				관리자 검색페이지
			{/if}
		</h2>

		<main class="card min-h-[300px] p-12">
			<slot />
		</main>
	</div>
</AppShell>
