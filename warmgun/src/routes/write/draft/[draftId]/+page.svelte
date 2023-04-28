<script lang="ts">
	import type { PageData } from './$types';
	import type { OutputData } from '@editorjs/editorjs';

	import DraftHeader from './DraftHeader.svelte';
	import Editor from '$components/@ui-blocks/Editor/Editor.svelte';

	export let data: PageData;

	$: ({
		draft: { title, subTitle, body },
		drafts
	} = data);

	$: initBody = body as unknown as OutputData | null;
</script>

<DraftHeader {drafts} />

<main class="max-w-[700px] mx-auto py-2 px-2 md:my-4">
	<Editor {title} {subTitle} {initBody} />
</main>
