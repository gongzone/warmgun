<script lang="ts">
	import { page } from '$app/stores';
	import { drawerStore } from '@skeletonlabs/skeleton';

	import type { NavLink } from '$lib/constants/nav';

	export let link: NavLink;

	$: classesActive = (href: string) =>
		href === $page.url.pathname ? '!bg-primary-active-token' : '';
</script>

<a href={link.to} class={classesActive(link.to)} on:click={() => drawerStore.close()}>
	{#if link.icon}
		<span>
			<svelte:component this={link.icon} class="w-[24px] h-[24px]" />
		</span>
	{/if}
	<span class="flex-auto">{link.name}</span>
</a>
