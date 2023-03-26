<script lang="ts">
	import { page } from '$app/stores';
	import PistolGunIcon from '~icons/game-icons/pistol-gun';
	import CloseIcon from '~icons/ri/close-line';
	import HomeIcon from '~icons/ri/home-3-line';
	import NowIcon from '~icons/ri/timer-flash-line';
	import FeedIcon from '~icons/ri/rss-line';
	import { drawerStore } from '@skeletonlabs/skeleton';

	import { defaultLinks, communities } from '$lib/constants/nav';

	$: classesActive = (href: string) =>
		href === $page.url.pathname ? '!bg-primary-active-token' : '';
</script>

<header class="flex justify-between items-center border-b border-b-surface-500 px-3 py-3">
	<a href="/" class="unstyled" on:click={() => drawerStore.close()}>
		<div class="flex items-center gap-2">
			<PistolGunIcon class="w-[40px] h-[40px]" />
			<h2 class="unstyled font-logo text-xl">Warmgun</h2>
		</div>
	</a>

	<button class="btn-icon" on:click={() => drawerStore.close()}>
		<span><CloseIcon class="w-[32px] h-[32px]" /></span>
	</button>
</header>

<nav class="px-4 py-6">
	<div class="list-nav">
		<ul>
			{#each defaultLinks as link (link.name)}
				<li>
					<a href={link.to} class={classesActive(link.to)} on:click={() => drawerStore.close()}>
						<span><svelte:component this={link.icon} class="w-[24px] h-[24px]" /></span>
						<span class="flex-auto">{link.name}</span>
					</a>
				</li>
			{/each}
		</ul>
	</div>

	<hr class="my-4" />
	<div class="text-surface-300 pl-4 text-sm font-bold mb-2">공동체</div>

	<div class="list-nav">
		<ul>
			{#each communities as community (community.name)}
				<li>
					<a
						href={community.to}
						class={classesActive(community.to)}
						on:click={() => drawerStore.close()}
					>
						<span class="flex-auto">{community.name}</span>
					</a>
				</li>
			{/each}
		</ul>
	</div>
</nav>
