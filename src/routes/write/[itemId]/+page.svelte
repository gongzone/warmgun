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

	export let data: PageData;
	export let form: ActionData;

	let getEditorData: () => ArticleEditorData;

	/* Init Editor Data */
	let title = 'sd';

	$: isDraftMode = $page.url.searchParams.get('mode') === 'draft';
</script>

<WriteController {getEditorData} />
<ArticleEditor bind:getEditorData {title} />
