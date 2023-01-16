<script lang="ts">
	import type { Editor } from '@tiptap/core';

	import { getMenuItems } from './menu-item';

	import MenuItem from './menu-item.svelte';

	export let editor: Editor;

	$: menuItems = getMenuItems(editor);
</script>

<header class="editor__header">
	{#each menuItems as item, index (index)}
		{#if item.type === 'divider'}
			<div class="divider" />
		{:else}
			<MenuItem icon={item.icon} title={item.title} action={item.action} isActive={item.isActive} />
		{/if}
	{/each}
</header>

<style>
	.editor__header {
		align-items: center;
		display: flex;
		flex: 0 0 auto;
		flex-wrap: wrap;
		padding: 0.25rem;
	}

	.divider {
		background-color: rgba(#000, 0.1);
		height: 1.25rem;
		margin-left: 0.5rem;
		margin-right: 0.75rem;
		width: 2px;
	}
</style>
