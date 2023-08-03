<script context="module" lang="ts">
	import { writable } from 'svelte/store';

	let isOpen = writable(false);

	export function openNavDrawer() {
		isOpen.set(true);
	}

	export function closeNavDrawer() {
		isOpen.set(false);
	}
</script>

<script lang="ts">
	import { page } from '$app/stores';
	import { sineIn } from 'svelte/easing';

	import { meta } from '$lib/constants/meta';
	import { navs } from '$lib/constants/navs';
	import { classesActive } from '$lib/utils/utils';

	import { CommonIcons } from '$components/@icons/common';
	import { SystemIcons } from '$components/@icons/system';
	import Drawer from '$components/@ui/Drawer.svelte';

	let transitionParams = {
		x: -320,
		duration: 200,
		easing: sineIn
	};
</script>

<Drawer
	id="nav-drawer"
	placement="left"
	transitionType="fly"
	width="w-[320px]"
	{transitionParams}
	bind:isOpen={$isOpen}
>
	<header class="flex justify-between items-center p-3 border-b border-surface-300-600-token">
		<a href="/" class="flex items-center gap-2 ml-3" on:click={() => closeNavDrawer()}>
			<CommonIcons.Logo class="w-5 h-5" />
			<h2 class="font-bold">{meta.title}</h2>
		</a>

		<button class="btn-icon" on:click={() => closeNavDrawer()}>
			<SystemIcons.Close class="w-6 h-6" />
		</button>
	</header>

	<nav class="list-nav px-3 py-6">
		<ul>
			{#each navs.mainNav as nav (nav.title)}
				<li>
					<a
						href={nav.href}
						class={classesActive($page.url.pathname, nav.href, '!bg-surface-300-600-token')}
						on:click={() => closeNavDrawer()}
					>
						<span class="variant-filled p-2 rounded-full">
							<svelte:component this={nav.icon} class="w-4 h-4" />
						</span>
						<span>{nav.title}</span>
					</a>
				</li>
			{/each}
		</ul>
	</nav>
</Drawer>
