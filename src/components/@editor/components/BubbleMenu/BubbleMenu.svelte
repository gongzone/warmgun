<script lang="ts">
	import { onMount, onDestroy } from 'svelte';

	import { BubbleMenuPlugin, type BubbleMenuPluginProps } from './bubble-menu-plugin';
	import { cn } from '$lib/utils/cn';

	import type { Editor } from '../../core/editor';
	import BubbleMenuButton from './BubbleMenuButton.svelte';

	export let editor: Editor;
	export let tippyOptions: BubbleMenuPluginProps['tippyOptions'] = {};
	export let pluginKey: BubbleMenuPluginProps['pluginKey'] = 'SvelteTiptapBubbleMenu';
	export let shouldShow: BubbleMenuPluginProps['shouldShow'] = null;
	export let updateDelay: BubbleMenuPluginProps['updateDelay'] = 250;

	let element: HTMLElement;

	if (!editor) {
		throw new Error('Missing editor instance.');
	}

	onMount(() => {
		const plugin = BubbleMenuPlugin({
			pluginKey,
			editor,
			element,
			tippyOptions,
			shouldShow,
			updateDelay
		});

		editor.registerPlugin(plugin);
	});

	onDestroy(() => {
		editor.unregisterPlugin(pluginKey);
	});
</script>

<div bind:this={element} class={cn($$props.class)} style="visibility: hidden;">
	<slot {BubbleMenuButton} />
</div>
