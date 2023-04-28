<script lang="ts">
	import type { PageServerData } from './$types';
	import type { OutputData } from '@editorjs/editorjs';

	import Editor from '$components/@ui-blocks/Editor/Editor.svelte';

	export let data: PageServerData;

	$: ({
		draft: { title, subTitle, body }
	} = data);

	$: initBody = body as unknown as OutputData | null;
</script>

<Editor {title} {subTitle} {initBody} />
