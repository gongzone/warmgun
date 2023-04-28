<script lang="ts">
	import type { OutputData } from '@editorjs/editorjs';

	import AutosizedTextarea from '$components/@ui-elements/AutosizeTextarea.svelte';
	import TextEditor from './_TextEditor/TextEditor.svelte';

	export let title: string;
	export let subTitle: string;
	export let initBody: OutputData | null;
</script>

<div class="space-y-4">
	<div>
		<AutosizedTextarea name="title" placeholder="제목을 입력하세요" bind:value={title} size="xl" />
		<AutosizedTextarea
			name="subTitle"
			placeholder="소제목을 입력하세요"
			bind:value={subTitle}
			size="lg"
		/>
	</div>

	<div class="px-[0.75rem] space-y-4">
		<hr />
		<TextEditor {initBody} />
	</div>
</div>
