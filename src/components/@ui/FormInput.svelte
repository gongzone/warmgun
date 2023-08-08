<script lang="ts">
	import type { ComponentType } from 'svelte';

	export let value: string = '';

	export let type: string = 'text';
	export let name: string;
	export let placeholder: string = '';
	export let labelText: string = '';
	export let helperText: string = '';
	export let required: boolean = true;
	export let icon: ComponentType | undefined = undefined;
</script>

<label class="space-y-2" for={name}>
	{#if labelText}
		<span class="text-sm opacity-75">{labelText}</span>
	{/if}

	<div class="input-group input-group-divider grid-cols-[auto_1fr_auto]">
		{#if icon}
			<div class="input-group-shim">
				<svelte:component this={icon} class="w-4 h-4" />
			</div>
		{/if}

		<input {type} {name} id={name} {value} {placeholder} {required} />
	</div>

	{#if helperText}
		<p class="text-sm text-error-600">{helperText}</p>
	{/if}
</label>
