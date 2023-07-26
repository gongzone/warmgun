<script lang="ts">
	import { cn } from '$lib/utils/cn';

	export let isActive: boolean = false;

	$: baseClasses = cn(
		'p-2 rounded-full transition-colors duration-200 border border-surface-900-50-token bg-surface-900-50-token text-surface-50-900-token hover:bg-surface-50-900-token hover:text-surface-900-50-token',
		isActive ? '!bg-surface-50-900-token text-surface-900-50-token' : '',
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
