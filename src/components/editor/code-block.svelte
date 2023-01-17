<script lang="ts">
	import type { NodeViewProps } from '@tiptap/core';
	import NodeViewWrapper from '$lib/editor/node-view-wrapper.svelte';

	export let node: NodeViewProps['node'];
	export let updateAttributes: NodeViewProps['updateAttributes'];
	export let extension: NodeViewProps['extension'];

	$: language = node.attrs.language;
	$: listLanguages = extension.options.lowlight.listLanguages() as string[];
</script>

<NodeViewWrapper class={`svelte-component`}>
	<select
		contentEditable={false}
		bind:value={language}
		on:change={() => updateAttributes({ language })}
	>
		<option value="null"> auto </option>
		<option disabled> — </option>
		{#each listLanguages as lang, index (index)}
			<option value={lang}>
				{lang}
			</option>
		{/each}
	</select>
	<pre class="unstyled">
    <code class="unstyled" contenteditable={true} />
  </pre>
</NodeViewWrapper>
