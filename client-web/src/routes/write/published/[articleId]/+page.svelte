<script lang="ts">
	import type EditorJS from '@editorjs/editorjs';
	import PublishedHeader from '$components/Header/PublishedHeader.svelte';
	import Editor from '$components/Editor/Editor.svelte';
	import { createQuery } from '@tanstack/svelte-query';
	import { page } from '$app/stores';
	import type { OutputData } from '@editorjs/editorjs';
	import { findOnePublished } from '$api/article';

	let editor: EditorJS;
	let title: string = '';
	let subTitle: string = '';
	let body: OutputData | null = null;
	let coverImage: string | null;
	let slug: string;
	let tags: string[];

	$: publishedArticleQuery = createQuery({
		queryKey: ['articles', +$page.params['articleId']],
		queryFn: () => findOnePublished(+$page.params['articleId'])
	});

	// for reactivity problem in binding inputs
	const updateInitEditorData = () => {
		if ($publishedArticleQuery.data) {
			title = $publishedArticleQuery.data.title;
			subTitle = $publishedArticleQuery.data.subTitle;
			body = $publishedArticleQuery.data.body;
			coverImage = $publishedArticleQuery.data.coverImage;
			slug = $publishedArticleQuery.data.slug;
			tags = $publishedArticleQuery.data.tags.map((tag) => tag.name);
		}
	};

	$: if ($publishedArticleQuery.isSuccess) {
		updateInitEditorData();
	}
</script>

<PublishedHeader
	getEditorData={async () => {
		const body = await editor.save();
		return { title, subTitle, body, coverImage, slug, tags };
	}}
/>

<div class="py-2 px-2 max-w-[700px] mx-auto md:my-4">
	<Editor bind:editor bind:title bind:subTitle bind:body />
</div>
