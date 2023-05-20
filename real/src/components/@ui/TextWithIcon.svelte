<script lang="ts">
	import type { SvelteComponent } from 'svelte';

	export let icon: typeof SvelteComponent;
	export let size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' = 'md';

	$: textClass = {
		xs: 'text-xs',
		sm: 'text-sm',
		md: 'text-base',
		lg: 'text-lg',
		xl: 'text-xl',
		'2xl': 'text-2xl',
		'3xl': 'text-3xl'
	};

	$: iconClass = {
		xs: 'w-2 h-2',
		sm: 'w-3 h-3',
		md: 'w-4 h-4',
		lg: 'w-6 h-6',
		xl: 'w-8 h-8',
		'2xl': 'w-10 h-10',
		'3xl': 'w-12 h-12'
	};
</script>

<div class="flex items-center gap-2 {textClass[size]}">
	<svelte:component this={icon} class={iconClass[size]} />
	<slot />
</div>
