<script lang="ts">
	import { page } from '$app/stores';
	import type { ActionData, PageData } from './$types';

	import type { CurrentEditorData } from '$lib/types/editor';
	import { triggerToast } from '$components/@ui/Toast/toast';

	import WriteHeader from './_WriteHeader/WriteHeader.svelte';
	import FullEditor from './_FullEditor/FullEditor.svelte';
	import Seo from '$components/@utils/Seo.svelte';
	import ArticleEditor, { type ArticleEditorData } from '$components/Write/ArticleEditor.svelte';
	import WriteController from '$components/Write/WrtieController/WriteController.svelte';
	import Separator from '$components/@ui/Separator.svelte';
	import type { Readable } from 'svelte/store';
	import type { JSONContent } from '@tiptap/core';
	import DraftDrawer from '$components/Write/DraftDrawer/DraftDrawer.svelte';

	export let data: PageData;
	export let form: ActionData;

	let getEditorData: () => ArticleEditorData;

	$: isDraftMode = $page.url.searchParams.get('mode') === 'draft';

	/* Init Editor Data */
	$: title = isDraftMode ? data.draft?.title : data.article?.title;
	$: body = (isDraftMode ? data.draft?.body : data.article?.body) as JSONContent;
</script>

<DraftDrawer />

<WriteController {getEditorData} />
<ArticleEditor bind:getEditorData {title} {body} />
