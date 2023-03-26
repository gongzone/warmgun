<script lang="ts">
	import { page } from '$app/stores';
	import { drawerStore } from '@skeletonlabs/skeleton';
	import { defaultLinks, communities } from '$lib/constants/nav';

	$: classesActive = (href: string) =>
		href === $page.url.pathname ? '!bg-primary-active-token' : '';
</script>

<nav class="list-nav">
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
</nav>

<hr class="my-4" />
<div class="text-surface-300 pl-4 text-sm font-bold mb-2">공동체</div>

<nav class="list-nav">
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
</nav>
