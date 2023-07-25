<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import {
		FloatingMenuPlugin,
		type FloatingMenuPluginProps
	} from '@tiptap/extension-floating-menu';

	import type { Editor } from './Editor';
	import FloatingMenuButton from './_FloatingMenuButton.svelte';
	import { cn } from '$lib/utils/cn';

	export let editor: Editor;
	export let tippyOptions: FloatingMenuPluginProps['tippyOptions'] = {};
	export let pluginKey: FloatingMenuPluginProps['pluginKey'] = 'SvelteTiptapFloatingMenu';
	export let shouldShow: FloatingMenuPluginProps['shouldShow'] = null;
	let element: HTMLElement;

	if (!editor) {
		throw new Error('Missing editor instance.');
	}

	onMount(() => {
		const plugin = FloatingMenuPlugin({
			pluginKey,
			editor,
			element,
			tippyOptions,
			shouldShow
		});

		editor.registerPlugin(plugin);
	});

	onDestroy(() => {
		editor.unregisterPlugin(pluginKey);
	});
</script>

<div
	bind:this={element}
	class={cn('flex items-center gap-2', $$props.class)}
	style="visibility: hidden;"
>
	<slot {FloatingMenuButton} />
</div>
