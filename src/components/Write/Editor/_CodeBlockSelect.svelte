<script lang="ts">
	import type { NodeViewProps } from '@tiptap/core';
	import NodeViewWrapper from './NodeView/NodeViewWrapper.svelte';
	import NodeViewContent from './NodeView/NodeViewContent.svelte';

	export let node: NodeViewProps['node'];
	export let updateAttributes: NodeViewProps['updateAttributes'];
	export let extension: NodeViewProps['extension'];

	$: console.log(extension.options.lowlight.listLanguages(), extension.options.defaultLanguage);

	const handleClick = (e: any) => {
		updateAttributes({ language: e.target.value });
	};

	$: console.log(node.attrs.language, extension.options.lowlight.registered(node.attrs.language));
</script>

<NodeViewWrapper class="relative">
	<select
		class="absolute py-2 left-3 top-4 bg-transparent rounded-md text-sm border-surface-300 focus:ring-0 focus:border-surface-300 focus:outline-1 focus:outline-surface-200"
		contenteditable={false}
		value={node.attrs.language === null ? extension.options.defaultLanguage : node.attrs.language}
		on:change={(e) => handleClick(e)}
	>
		{#each extension.options.lowlight.listLanguages() as lang, index (index)}
			<option value={lang} class="bg-surface-700">
				{lang}
			</option>
		{/each}
	</select>
	<pre class="pt-10">
    <NodeViewContent as="code" />
  </pre>
</NodeViewWrapper>
