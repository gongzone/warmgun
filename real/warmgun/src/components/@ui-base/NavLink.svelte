<script lang="ts">
	import { page } from '$app/stores';

	import type { LinkData } from '$lib/types/link';

	export let link: LinkData;
	export let badge: boolean = false;
	export let iconSize: 'sm' | 'md' | 'lg' = 'md';
	export let textClasses: string = '';

	const iconSizeMap = {
		sm: 'w-[20px] h-[20px]',
		md: 'w-[24px] h-[24px]',
		lg: 'w-[28px] h-[28px]'
	};

	$: classesActive = (href: string) =>
		href === $page.url.pathname ? '!bg-primary-active-token' : '';
</script>

<a href={link.to} class={classesActive(link.to)} on:click>
	{#if link.icon}
		<span class={badge ? 'badge-icon py-4' : ''}>
			<svelte:component this={link.icon} class={iconSizeMap[iconSize]} />
		</span>
	{/if}
	<span class="flex-auto {textClasses}">{link.name}</span>
</a>
