<script context="module" lang="ts">
	export type drawerTransitionTypes =
		| 'fade'
		| 'fly'
		| 'slide'
		| 'blur'
		| 'in:fly'
		| 'out:fly'
		| 'in:slide'
		| 'out:slide'
		| 'in:fade'
		| 'out:fade'
		| 'in:blur'
		| 'out:blur'
		| undefined;

	export interface drawerTransitionParamTypes {
		amount?: number;
		delay?: number;
		duration?: number;
		easing?: (t: number) => number;
		opacity?: number;
		x?: number;
		y?: number;
	}

	export const clickOutside = (node: HTMLElement, callback: () => void) => {
		const handleClick = (event: MouseEvent) => {
			if (!event?.target) return;
			if (node && !node.contains(event.target as Node) && !event.defaultPrevented) {
				callback();
			}
		};

		document.addEventListener('click', handleClick, true);

		return {
			destroy() {
				document.removeEventListener('click', handleClick, true);
			}
		};
	};
</script>

<script lang="ts">
	import { twMerge } from 'tailwind-merge';
	import { fly, slide, blur, fade } from 'svelte/transition';

	export let activateClickOutside: boolean = true;
	export let hidden: boolean = true;
	export let position: 'fixed' | 'absolute' = 'fixed';
	export let leftOffset: string = 'inset-y-0 left-0';
	export let rightOffset: string = 'inset-y-0 right-0';
	export let topOffset: string = 'inset-x-0 top-0';
	export let bottomOffset: string = 'inset-x-0 bottom-0';
	export let width: string = 'w-80';
	export let backdrop: boolean = true;
	export let bgColor: string = 'bg-surface-backdrop-token';
	export let bgOpacity: string = 'bg-opacity-75';
	export let placement: 'left' | 'right' | 'top' | 'bottom' = 'left';
	export let id: string = 'drawer-example';
	export let divClass: string = 'overflow-y-auto z-50 bg-surface-100-800-token shadow-xl';
	export let transitionParams: drawerTransitionParamTypes = {};
	export let transitionType: drawerTransitionTypes = 'fly';

	function multiple(node: HTMLElement, params: any) {
		switch (transitionType) {
			case 'slide':
				return slide(node, params);
			case 'blur':
				return blur(node, params);
			case 'fade':
				return fade(node, params);
			default:
				return fly(node, params);
		}
	}

	const placements = {
		left: leftOffset,
		right: rightOffset,
		top: topOffset,
		bottom: bottomOffset
	};

	const handleDrawer = () => {
		hidden = !hidden;
	};

	let backdropDivClass = twMerge(
		'fixed top-0 left-0 z-50 w-full h-full',
		backdrop && bgColor,
		backdrop && bgOpacity
	);

	function clickOutsideWrapper(node: HTMLElement, callback: () => void) {
		return activateClickOutside ? clickOutside(node, callback) : undefined;
	}
</script>

{#if !hidden}
	{#if backdrop && activateClickOutside}
		<div role="presentation" class={backdropDivClass} on:click={() => !hidden && handleDrawer()} />
	{:else if backdrop && !activateClickOutside}
		<div role="presentation" class={backdropDivClass} />
	{/if}

	<div
		use:clickOutsideWrapper={() => !hidden && handleDrawer()}
		{id}
		{...$$restProps}
		class={twMerge(divClass, width, position, placements[placement], $$props.class)}
		transition:multiple={transitionParams}
		tabindex="-1"
		aria-controls={id}
		aria-labelledby={id}
	>
		<slot {hidden} />
	</div>
{/if}
