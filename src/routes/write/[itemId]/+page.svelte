<script lang="ts">
	import { page } from '$app/stores';
	import type { ActionData, PageData } from './$types';

	import type { CurrentEditorData } from '$lib/types/editor';
	import { triggerToast } from '$components/@ui/Toast/toast';

	import WriteHeader from './_WriteHeader/WriteHeader.svelte';
	import FullEditor from './_FullEditor/FullEditor.svelte';
	import Seo from '$components/@utils/Seo.svelte';
	import Editor from '$components/Write/Editor/Editor.svelte';
	import WriteController from '$components/Write/WrtieController/WriteController.svelte';
	import TitleTextarea from '$components/Write/TitleTextarea/TitleTextarea.svelte';
	import Separator from '$components/@ui/Separator.svelte';

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

<Seo title={isDraftMode ? '글 작성' : '글 수정'} />

<WriteController />

<div class="max-w-[690px] mx-auto my-10 px-4">
	<TitleTextarea />
	<Separator class="my-1 mb-8" />
	<Editor />
</div>
