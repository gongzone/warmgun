<script lang="ts">
	import type { OutputData } from '@editorjs/editorjs';

	import AutosizedTextarea from '$components/@ui-elements/AutosizeTextarea.svelte';
	import TextEditor from './_TextEditor/TextEditor.svelte';

	interface EditorData {
		title: string;
		subTitle: string;
		body: any;
	}

	export let initData: EditorData;
	export const getCurrentEditorData = async () => {
		return { title: initData.title, subTitle: initData.subTitle, body: await getCurrentBody() };
	};

	let getCurrentBody: () => Promise<OutputData>;
</script>

<div class="space-y-4">
	<div>
		<AutosizedTextarea
			name="title"
			placeholder="제목을 입력하세요"
			bind:value={initData.title}
			size="xl"
		/>
		<AutosizedTextarea
			name="subTitle"
			placeholder="소제목을 입력하세요"
			bind:value={initData.subTitle}
			size="lg"
		/>
	</div>

	<div class="px-[0.75rem] space-y-4">
		<hr />
		<TextEditor body={initData.body} bind:getCurrentBody />
	</div>
</div>
