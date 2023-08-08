<script lang="ts">
	import { page } from '$app/stores';
	import type { ActionData, PageData } from './$types';

	import { triggerToast } from '$components/@ui/Toast/toast';

	import Seo from '$components/@utils/Seo.svelte';
	import ArticleEditor, { type ArticleEditorData } from '$components/Write/ArticleEditor.svelte';
	import WriteController from '$components/Write/WrtieController/WriteController.svelte';
	import type { JSONContent } from '@tiptap/core';
	import DraftDrawer from '$components/Write/DraftDrawer/DraftDrawer.svelte';

	export let data: PageData;
	export let form: ActionData;

	let getEditorData: () => ArticleEditorData;

	$: isDraftMode = $page.url.searchParams.get('mode') === 'draft';

	/* Init Editor Data */
	$: title = isDraftMode ? data.draft?.title : data.article?.title;
	$: body = (isDraftMode ? data.draft?.body : data.article?.body) as JSONContent;
	$: coverImage = isDraftMode ? null : data.article?.coverImage;
	$: tags = isDraftMode ? [] : data.article!.tags;
	$: category = isDraftMode ? 'ETC' : data.article?.category;

	$: if (form?.message) {
		triggerToast(`${form.isSuccess ? 'success' : 'warning'}`, form.message);
	}
</script>

<Seo title={isDraftMode ? '글 작성' : '글 수정'} />

<DraftDrawer />

<WriteController
	{coverImage}
	tags={tags.length > 0 ? tags.map((tag) => tag.name) : []}
	{category}
	{getEditorData}
/>
<ArticleEditor bind:getEditorData {title} {body} />
