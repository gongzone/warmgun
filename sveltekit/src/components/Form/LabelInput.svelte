<script lang="ts">
	export let type: string;
	export let name: string;
	export let placeholder: string = '';
</script>

<label class="input-label" for={name}>
	{#if $$slots.labelText}
		<span class="text-sm text-surface-300"><slot name="labelText" /></span>
	{/if}

	<div class="input-group input-group-divider grid-cols-[auto_1fr_auto]">
		{#if $$slots.icon}
			<div class="input-group-shim">
				<slot name="icon" />
			</div>
		{/if}

		<input {type} {name} id={name} {placeholder} required />
	</div>

	{#if $$slots.helperText}
		<p class="unstyled mt-2 mb-0 text-sm text-surface-300"><slot name="helperText" /></p>
	{/if}
</label>
