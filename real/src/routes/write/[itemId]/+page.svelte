<script lang="ts">
	import { page } from '$app/stores';
	import type { ActionData, PageData } from './$types';

	import type { CurrentEditorData } from '$lib/types/editor';
	import { triggerToast } from '$lib/components/@ui/Toast/toast';
	import WriteHeader from '$lib/components/Header/WriteHeader/WriteHeader.svelte';
	import FullEditor from '$lib/components/Editor/FullEditor.svelte';

	export let data: PageData;
	export let form: ActionData;

	let getCurrentEditorData: () => Promise<CurrentEditorData>;

	$: title =
		$page.url.searchParams.get('mode') === 'draft' ? data.draft?.title : data.article?.title;
	$: body = $page.url.searchParams.get('mode') === 'draft' ? data.draft?.body : data.article?.body;

	$: if (form?.message) {
		triggerToast(`${form.isSuccess ? 'success' : 'warning'}`, form.message);
	}
</script>

<WriteHeader {getCurrentEditorData} />

<main class="max-w-[700px] mx-auto py-2 px-2 md:my-4">
	<FullEditor {title} {body} bind:getCurrentEditorData />
</main>
