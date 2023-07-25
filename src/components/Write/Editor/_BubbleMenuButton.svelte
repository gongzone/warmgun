<script lang="ts">
	import { cn } from '$lib/utils/cn';

	export let isActive: boolean = false;

	$: baseClasses = cn(
		'p-2 m-[0.1rem] rounded-full transition-colors duration-200 hover:bg-primary-500/50',
		isActive ? 'bg-primary-500/50' : '',
		$$props.class
	);
</script>

<button
	type="button"
	class={baseClasses}
	on:click
	on:change
	on:keydown
	on:keyup
	on:mouseenter
	on:mouseleave
>
	<slot />
</button>
