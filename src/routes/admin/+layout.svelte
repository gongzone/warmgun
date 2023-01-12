<script lang="ts">
	import { writable, type Writable } from 'svelte/store';
	import { page } from '$app/stores';
	import type { LayoutData } from './$types';
	import { AppShell, AppBar, AppRail, AppRailTile } from '@skeletonlabs/skeleton';

	import MainLogo from '$components/@svg/main-logo.svelte';

	export let data: LayoutData;

	const railStore: Writable<string> = writable('item');

	$: adminName = data.user?.character.name;
	$: classesActive = (href: string) =>
		href === $page.url.pathname ? '!bg-primary-active-token' : '';
</script>

<AppShell slotPageContent="p-5">
	<svelte:fragment slot="header">
		<AppBar padding="px-[5vw] py-4">
			<svelte:fragment slot="lead">
				<div class="flex items-center gap-1">
					<a href="/">
						<MainLogo />
					</a>
					<h2 class="font-logo text-3xl md:text-4xl">Hello, {adminName}👋</h2>
				</div>
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>

	<svelte:fragment slot="sidebarLeft">
		<div
			class="grid grid-cols-[auto_1fr] h-full border-r border-black/5 dark:border-white/5 backdrop-blur lg:grid w-[360px] overflow-hidden"
		>
			<AppRail background="bg-black/30" selected={railStore}>
				<AppRailTile label="아이템" value="item">📃</AppRailTile>
				<AppRailTile label="유저" value="user">(icon)</AppRailTile>
			</AppRail>

			<nav class="p-4 space-y-4 overflow-y-auto min-w-[260px]">
				{#if $railStore === 'item'}
					<div class="text-primary-700 dark:text-primary-500 font-bold uppercase px-4">
						{$railStore}
					</div>
					<nav class="list-nav">
						<ul>
							<li>
								<a href="/admin/avatar" class={classesActive('/admin/avatar')}>아바타</a>
							</li>
							<li>
								<a href="/admin/title" class={classesActive('/admin/title')}>타이틀</a>
							</li>
						</ul>
					</nav>
				{/if}
			</nav>
		</div>
	</svelte:fragment>

	<slot />
</AppShell>
