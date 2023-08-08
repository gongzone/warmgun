<script lang="ts">
	import type { PageData } from './$types';
	import { enhance } from '$app/forms';

	import PostEditor, { type PostEditorData } from '$components/Community/PostEditor.svelte';
	import type { Community } from '$lib/constants/communities';
	import { onMount } from 'svelte';
	import type { HTMLContent, JSONContent } from '@tiptap/core';
	import Seo from '$components/@utils/Seo.svelte';

	export let data: PageData;

	let title: string = '';
	let community: Community = 'FREE';
	let body: JSONContent | HTMLContent = '';

	let getEditorData: () => PostEditorData;

	onMount(() => {
		if (data.post) {
			title = data.post.title;
			community = data.post.community;
			body = data.post.body as JSONContent;
		}
	});
</script>

<Seo title={data.isEditMode ? '게시글 수정' : '게시글 등록'} />

<div class="max-w-prose mx-auto py-16 md:py-20 space-y-4">
	<span class="text-3xl font-bold">커뮤니티 글쓰기</span>
	<PostEditor {body} bind:title bind:community bind:getEditorData />

	<div class="flex items-center justify-end gap-2">
		<a href="/community" class="btn variant-filled">취소</a>

		<form
			method="POST"
			action="?/createPost"
			use:enhance={({ data }) => {
				const { title, body, community } = getEditorData();
				data.append('title', title);
				data.append('body', JSON.stringify(body));
				data.append('community', community);

				return async ({ update, result }) => {
					update();
				};
			}}
		>
			<button type="submit" class="btn variant-filled-primary"
				>{data.isEditMode ? '수정' : '등록'}</button
			>
		</form>
	</div>
</div>
