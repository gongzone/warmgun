<script lang="ts">
	export let value: string = '';

	export let rows: number = 4;
	export let name: string;
	export let placeholder: string = '';
	export let labelText: string = '';
	export let helperText: string = '';
</script>

<label class="space-y-2" for={name}>
	{#if labelText}
		<span class="text-sm opacity-75">{labelText}</span>
	{/if}
	<textarea class="textarea p-4" {rows} {name} id={name} {placeholder} {value} required />

	{#if helperText}
		<p class="text-xs opacity-75">{helperText}</p>
	{/if}
</label>
