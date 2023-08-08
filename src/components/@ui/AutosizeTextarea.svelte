<script lang="ts">
	import autosize from 'autosize';

	export let name: string;
	export let size: 'sm' | 'md' | 'lg' | 'xl' = 'md';
	export let placeholder: string = '';
	export let value: string;

	const sizeStyles = {
		sm: 'h-6 text-base',
		md: 'h-8 text-lg',
		lg: 'h-10 text-2xl font-bold',
		xl: 'h-10 text-3xl font-bold'
	};

	let textarea: Element;

	$: autosize(textarea);
</script>

<textarea
	class="w-full resize-none border-0 bg-transparent p-0 focus:!outline-none focus:ring-0 {sizeStyles[
		size
	]}"
	{name}
	{placeholder}
	bind:value
	bind:this={textarea}
/>
