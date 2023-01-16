<script lang="ts">
	import autosize from 'autosize';

	import Editor from '$components/editor/editor.svelte';

	let titleTextarea: Element;
	let descriptionTextarea: Element;

	$: titleTextarea ? autosize(titleTextarea) : null;
	$: descriptionTextarea ? autosize(descriptionTextarea) : null;
</script>

<textarea
	class="unstyled h-14 text-3xl"
	placeholder="제목을 입력하세요"
	bind:this={titleTextarea}
/>
<textarea class="unstyled h-8" placeholder="소제목을 입력하세요" bind:this={descriptionTextarea} />

<Editor />

<style lang="postcss">
	textarea {
		@apply w-full resize-none border-0 bg-transparent font-bold;
	}

	textarea:focus {
		outline: none !important;
		box-shadow: none !important;
	}
</style>
