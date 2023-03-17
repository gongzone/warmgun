<script lang="ts">
	import '../../styles/editor.postcss';

	import { onMount, onDestroy } from 'svelte';
	import EditorJS from '@editorjs/editorjs';

	import AutosizedTextarea from '$components/@base/Input/AutoSizedTextarea.svelte';

	export let title: string;
	export let subTitle: string;
	// export let body: string;

	let editor: EditorJS | null;

	// header, quote, alert, nested-list, image, marker, underline, inline-code

	onMount(() => {
		editor = new EditorJS({
			holder: 'editorjs',
			placeholder: '당신의 이야기를 들려주세요.'
		});
	});

	onDestroy(() => {
		if (editor) {
			editor.destroy();
			editor = null;
		}
	});
</script>

<div class="space-y-4">
	<div>
		<AutosizedTextarea name="title" placeholder="제목을 입력하세요" bind:value={title} size="lg" />
		<AutosizedTextarea
			name="subTitle"
			placeholder="소제목을 입력하세요"
			bind:value={subTitle}
			size="md"
		/>
	</div>

	<div class="px-[0.75rem]">
		<hr />
	</div>

	<div id="editorjs" class="px-[0.75rem]" />
</div>
