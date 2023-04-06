<script lang="ts">
	import autosize from 'autosize';

	type TextareaSize = 'sm' | 'md' | 'lg';

	export let name: string;
	export let value: string;
	export let placeholder: string = '';
	export let size: TextareaSize = 'md';

	let textarea: Element;

	$: autosize(textarea);
	$: textareaSize =
		size === 'md'
			? 'h-10 text-2xl font-bold'
			: size === 'lg'
			? 'h-14 text-3xl font-bold'
			: 'h-6 text-base';
</script>

<textarea
	class={`unstyled w-full resize-none border-0 bg-transparent focus:!outline-none focus:ring-0 ${textareaSize}`}
	{name}
	{placeholder}
	bind:value
	bind:this={textarea}
/>
