<script lang="ts">
	import type { HTMLAnchorAttributes, HTMLButtonAttributes } from 'svelte/elements';
	import type { VariantProps } from 'class-variance-authority';

	import { cn } from '$lib/utils/cn';
	import { buttonVariants } from './button-variants';

	let className: string | undefined = undefined;

	export { className as class };
	export let as: 'button' | 'a' = 'button';
	export let type: HTMLButtonAttributes['type'] = undefined;
	export let href: HTMLAnchorAttributes['href'] = undefined;
	export let variant: VariantProps<typeof buttonVariants>['variant'] = 'default';
	export let size: VariantProps<typeof buttonVariants>['size'] = 'default';
</script>

<svelte:element
	this={as}
	role={as === 'button' ? 'button' : 'link'}
	type={as === 'button' ? type : undefined}
	href={as === 'button' ? undefined : href}
	class={cn(buttonVariants({ variant, size, className }))}
	{...$$restProps}
	on:click
	on:change
	on:keydown
	on:keyup
	on:mouseenter
	on:mouseleave
>
	<slot />
</svelte:element>
