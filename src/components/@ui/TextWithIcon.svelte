<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import type { ComponentType } from 'svelte';

	export let icon: ComponentType;
	export let size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' = 'md';
	export let gap: 1 | 2 | 3 | 4 | 5 = 1;
	export let textClasses: string = '';
	export let iconClasses: string = '';

	const iconSizeClass = {
		xs: 'w-2 h-2',
		sm: 'w-4 h-4',
		md: 'w-5 h-5',
		lg: 'w-5 h-5',
		xl: 'w-6 h-6',
		'2xl': 'w-7 h-7',
		'3xl': 'w-8 h-8',
		'4xl': 'w-9 h-9'
	};

	const textSizeClass = {
		xs: 'text-xs',
		sm: 'text-sm',
		md: 'text-sm',
		lg: 'text-md',
		xl: 'text-lg',
		'2xl': 'text-2xl',
		'3xl': 'text-3xl',
		'4xl': 'text-4xl'
	};

	const gapClass = {
		1: 'gap-1',
		2: 'gap-2',
		3: 'gap-3',
		4: 'gap-4',
		5: 'gap-5'
	};
</script>

<div class={cn('flex items-center', gapClass[gap])}>
	<svelte:component this={icon} class={cn(iconSizeClass[size], iconClasses)} />
	<span class={cn(textSizeClass[size], textClasses)}>
		<slot />
	</span>
</div>
