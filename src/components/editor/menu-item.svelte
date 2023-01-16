<script lang="ts">
	import remixiconUrl from 'remixicon/fonts/remixicon.symbol.svg';

	export let icon: string | undefined;
	export let title: string | undefined;
	export let action: (() => boolean) | undefined;
	export let isActive: (() => boolean) | undefined;
</script>

<button class={`menu-item${isActive && isActive() ? ' is-active' : ''}`} on:click={action} {title}>
	<svg class="remix">
		<use xlink:href={`${remixiconUrl}#ri-${icon}`} />
	</svg>
</button>

<style>
	.menu-item {
		background-color: transparent;
		border: none;
		border-radius: 0.4rem;
		color: #e1e1e1;
		height: 1.75rem;
		margin-right: 0.25rem;
		padding: 0.25rem;
		width: 1.75rem;
	}

	.menu-item:hover,
	.menu-item.is-active {
		background-color: #0d0d0d;
		color: #fff;
	}

	svg {
		fill: currentColor;
		height: 100%;
		width: 100%;
	}
</style>
