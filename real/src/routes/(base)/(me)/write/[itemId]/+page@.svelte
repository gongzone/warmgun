<script lang="ts">
	import { page } from '$app/stores';
	import type { ActionData, PageData } from './$types';

	import type { CurrentEditorData } from '$lib/types/editor';
	import { triggerToast } from '$components/@ui/Toast/toast';

	import WriteHeader from './_WriteHeader/WriteHeader.svelte';
	import FullEditor from './_FullEditor/FullEditor.svelte';

	export let data: PageData;
	export let form: ActionData;

	let getCurrentEditorData: () => Promise<CurrentEditorData>;

	$: isDraftMode = $page.url.searchParams.get('mode') === 'draft';
	$: articleMeta = isDraftMode
		? undefined
		: {
				coverImage: data.article!.coverImage,
				tags: data.article!.tags.map((tag) => tag.name),
				genre: data.article!.genre
		  };
	$: if (form?.message) {
		triggerToast(`${form.isSuccess ? 'success' : 'warning'}`, form.message);
	}
</script>

<WriteHeader mode={isDraftMode ? 'draft' : 'edit'} {articleMeta} {getCurrentEditorData} />

<FullEditor
	title={isDraftMode ? data.draft?.title : data.article?.title}
	body={isDraftMode ? data.draft?.body : data.article?.body}
	bind:getCurrentEditorData
/>
