<script lang="ts">
	import { fade } from 'svelte/transition';
	import CloseIcon from '~icons/ri/close-line';

	export let isVisible = false;
	export let errorTitle = '오, 이럴수가!';
	export let errorMessage = '';
</script>

{#if isVisible}
	<aside class="alert variant-ghost-warning" transition:fade|local={{ duration: 200 }}>
		<div class="text-4xl">⚠️</div>

		<div class="alert-message">
			<h3 class="text-xl font-bold">{errorTitle}</h3>
			<p>{errorMessage}</p>
		</div>

		<div class="alert-actions">
			<button
				type="button"
				class="btn-icon variant-ghost-tertiary"
				on:click={() => {
					isVisible = false;
				}}
			>
				<span><CloseIcon /></span>
			</button>
		</div>
	</aside>
{/if}
