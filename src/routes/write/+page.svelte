<script lang="ts">
	import { tooltip } from '@skeletonlabs/skeleton';
	import autosize from 'autosize';

	import Editor from '$components/editor/editor.svelte';

	let titleTextarea: Element;
	let descriptionTextarea: Element;

	$: titleTextarea ? autosize(titleTextarea) : null;
	$: descriptionTextarea ? autosize(descriptionTextarea) : null;
</script>

<div class="flex justify-between mb-8">
	<button
		class="btn-icon btn-ghost-surface"
		use:tooltip={{
			content: '돌아가기',
			position: 'right',
			background: '!bg-surface-500',
			width: '!w-24'
		}}><i class="ri-arrow-left-line ri-lg" /></button
	>
	<button class="btn btn-filled-primary btn-base">글 등록</button>
</div>

<div class="flex justify-end">
	<button class="btn-icon btn-filled-secondary" title="커버 이미지"
		><i class="ri-image-add-line ri-lg" /></button
	>
</div>

<div class="mb-4">
	<textarea
		class="unstyled h-14 text-3xl"
		placeholder="제목을 입력하세요"
		bind:this={titleTextarea}
	/>
	<textarea
		class="unstyled h-8"
		placeholder="소제목을 입력하세요"
		bind:this={descriptionTextarea}
	/>
</div>
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
