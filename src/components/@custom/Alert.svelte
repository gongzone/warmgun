<script lang="ts">
	export let isVisible = false;
	export let errorTitle = '오, 이럴수가!';
	export let errorMessage = '';
</script>

{#if isVisible}
	<aside class="alert variant-ghost-warning">
		<div class="text-4xl">⚠️</div>
		<div class="alert-message">
			<h3 class="text-xl font-bold">{errorTitle}</h3>
			<p>{errorMessage}</p>
		</div>
	</aside>
{/if}
